// Local staged-form browser checks. Uses only synthetic data and mocked submissions.
import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { mkdtemp, readFile, rm } from 'node:fs/promises';
import { join } from 'node:path';
import { setTimeout as delay } from 'node:timers/promises';

const chrome = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const profile = await mkdtemp(join(process.env.TMPDIR, 'hc-browser-'));
const browser = spawn(chrome, ['--headless=new', '--disable-gpu', '--no-first-run', '--no-default-browser-check', '--remote-debugging-port=0', `--user-data-dir=${profile}`, '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE localhost', 'about:blank'], { stdio: 'ignore' });
let socket;
try {
    let port;
    for (let i = 0; i < 50; i++) {
        try { port = (await readFile(join(profile, 'DevToolsActivePort'), 'utf8')).split('\n')[0]; break; } catch { await delay(200); }
    }
    assert.ok(port, 'Chrome debugging port unavailable');
    const target = await (await fetch(`http://localhost:${port}/json/new?about:blank`, { method: 'PUT' })).json();
    socket = new WebSocket(target.webSocketDebuggerUrl);
    await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
    let id = 0;
    const pending = new Map();
    socket.onmessage = ({ data }) => {
        const message = JSON.parse(data);
        if (message.id && pending.has(message.id)) {
            const { resolve, reject } = pending.get(message.id);
            pending.delete(message.id);
            message.error ? reject(new Error(message.error.message)) : resolve(message.result);
        }
    };
    const send = (method, params = {}) => new Promise((resolve, reject) => {
        const key = ++id;
        pending.set(key, { resolve, reject });
        socket.send(JSON.stringify({ id: key, method, params }));
    });
    const evaluate = async (expression) => {
        const result = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
        if (result.exceptionDetails) throw new Error(result.exceptionDetails.text);
        return result.result.value;
    };
    await send('Page.enable');
    await send('Network.enable');
    await send('Network.setBlockedURLs', { urls: ['https://*', 'http://forms.ingadraper.com/*'] });
    await send('Page.navigate', { url: 'http://localhost:4321/highland-creek/' });
    for (let i = 0; i < 50; i++) {
        if (await evaluate("document.readyState === 'complete' && !!document.querySelector('#home-review-form')")) break;
        await delay(200);
    }
    assert.equal(await evaluate("document.querySelector('#home-review-form') !== null"), true);
    const run = async (expression, label) => { assert.equal(await evaluate(expression), true, label); console.log(`PASS ${label}`); };
    await run(`(() => {
        const form = document.querySelector('#home-review-form');
        return ['name','email','address','message'].every(name => {
            const el = form.elements.namedItem(name);
            return el && el.labels.length === 1 && el.labels[0].textContent.trim().length > 0;
        }) && ['name','email','address'].every(name => form.elements.namedItem(name).required)
            && !form.elements.namedItem('message').required && !form.elements.namedItem('phone');
    })()`, 'explicit labels, required fields and optional message');
    await run(`(() => {
        const f=document.querySelector('#home-review-form'), n=f.elements.name, e=f.elements.email, a=f.elements.address, m=f.elements.message;
        if (f.checkValidity()) return false;
        n.value='Synthetic User'; e.value='bad'; a.value='123 Example Street';
        if (f.checkValidity()) return false;
        e.value='synthetic@example.test'; m.value='';
        if (!f.checkValidity()) return false;
        n.value='x'.repeat(81); n.dispatchEvent(new Event('input',{bubbles:true}));
        return n.maxLength===80 && a.minLength===5 && a.maxLength===200 && m.maxLength===1500;
    })()`, 'required and optional native validation constraints');
    await evaluate("document.querySelector('#review-message').focus()");
    await send('Input.insertText', { text: 'x'.repeat(1501) });
    await run("document.querySelector('#review-message').value.length === 1500", 'optional message enforces its maximum length');
    await run(`(() => {
        const f=document.querySelector('#home-review-form'); f.elements.name.value='  '; f.elements.email.value='synthetic@example.test'; f.elements.address.value='123 Example Street';
        f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
        return f.elements.name.validity.customError;
    })()`, 'trimmed name validation');
    await run(`(() => {
        const f=document.querySelector('#home-review-form'); f.elements.name.value='Synthetic User'; f.elements.name.dispatchEvent(new Event('input')); f.elements.address.value='   '; f.dispatchEvent(new Event('submit',{bubbles:true,cancelable:true}));
        return f.elements.address.validity.customError;
    })()`, 'trimmed address validation');
    await run(`(() => {
        const f=document.querySelector('#home-review-form'); f.elements.address.value='123 Example Street'; f.elements.address.dispatchEvent(new Event('input')); f.requestSubmit();
        return document.querySelector('#home-review-status').textContent.includes('not available');
    })()`, 'without a mock the form cannot submit');
    await run(`(() => {
        const f=document.querySelector('#home-review-form'); let called=false;
        window.__homeReviewMockSubmit=()=>{called=true}; f.elements.website.value='spam'; f.requestSubmit(); f.elements.website.value='';
        return !called && document.querySelector('#home-review-status').textContent.includes('Something went wrong');
    })()`, 'non-empty honeypot does not submit');
    await run(`(async () => {
        const f=document.querySelector('#home-review-form'); let payload;
        window.__homeReviewMockSubmit=async data => { payload=data; return {status:200,json:async()=>({ok:true,requestId:'synthetic'})}; };
        f.elements.message.value='Optional note'; f.requestSubmit(); await new Promise(r=>setTimeout(r,25));
        return payload.name==='Synthetic User' && payload.email==='synthetic@example.test' && payload.address==='123 Example Street' && payload.message==='Optional note' && payload.website==='' && Object.keys(payload).length===5 && document.querySelector('#home-review-status').textContent.startsWith('Thank you');
    })()`, 'mock 200 success and exact synthetic payload');
    await run(`(async () => {
        const f=document.querySelector('#home-review-form'); f.elements.name.value='Synthetic User'; f.elements.email.value='synthetic@example.test'; f.elements.address.value='123 Example Street'; f.elements.message.value='';
        window.__homeReviewMockSubmit=async ()=>({status:422,json:async()=>({ok:false,error:'invalid',fields:{email:'invalid'}})}); f.requestSubmit(); await new Promise(r=>setTimeout(r,25));
        return f.elements.email.validity.customError && document.querySelector('#home-review-status').textContent.includes('check');
    })()`, 'mock 422 per-field feedback');
    await run(`(async () => {
        const f=document.querySelector('#home-review-form'); f.elements.email.dispatchEvent(new Event('input'));
        window.__homeReviewMockSubmit=async ()=>({status:502,json:async()=>({ok:false})}); f.requestSubmit(); await new Promise(r=>setTimeout(r,25));
        return document.querySelector('#home-review-status').textContent.includes('Something went wrong');
    })()`, 'mock server error');
    await run(`(async () => {
        const f=document.querySelector('#home-review-form'); window.__homeReviewMockSubmit=async ()=>{throw Error('offline')}; f.requestSubmit(); await new Promise(r=>setTimeout(r,25));
        return document.querySelector('#home-review-status').textContent.includes('Something went wrong');
    })()`, 'mock network error');
    await run(`(async () => {
        const f=document.querySelector('#home-review-form'); window.__homeReviewMockSubmit=async ()=>({status:200,json:async()=>({ok:true})}); f.requestSubmit(); await new Promise(r=>setTimeout(r,25));
        return document.querySelector('#home-review-status').textContent.includes('Something went wrong');
    })()`, 'malformed success is rejected');
    await run(`(async () => {
        const f=document.querySelector('#home-review-form'); window.__homeReviewMockSubmit=async ()=>({status:201,json:async()=>({ok:true,requestId:'synthetic'})}); f.requestSubmit(); await new Promise(r=>setTimeout(r,25));
        return document.querySelector('#home-review-status').textContent.includes('Something went wrong');
    })()`, 'non-200 response is rejected');
    await run(`(() => {
        const data=JSON.parse(document.querySelector('#hc-public-data').textContent); const home=data.county.properties[0]; const input=document.querySelector('#hc-address');
        if (!home || document.querySelector('#hc-search').hidden) return false;
        input.value=home.address; input.dispatchEvent(new Event('input',{bubbles:true})); const option=document.querySelector('#hc-options [role=option]'); if(!option) return false; option.click();
        return !document.querySelector('#hc-results').hidden && document.querySelector('#hc-subject').textContent.includes(home.address);
    })()`, 'comparable-sales lookup remains ungated');
    for (const width of [320, 375, 768, 1440]) {
        await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: false });
        await run(`(() => {
            const f=document.querySelector('#home-review-form'); const controls=[...f.querySelectorAll('input:not([name=website]), textarea, button')];
            return document.documentElement.scrollWidth <= innerWidth && controls.every(el => { const r=el.getBoundingClientRect(); return r.width > 0 && r.left >= 0 && r.right <= innerWidth + 1; });
        })()`, `responsive ${width}px`);
    }
} finally {
    if (socket) socket.close();
    browser.kill();
    await delay(500);
    await rm(profile, { recursive: true, force: true, maxRetries: 2, retryDelay: 200 });
}
