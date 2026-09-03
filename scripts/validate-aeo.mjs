import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';
import ts from 'typescript';

const ROOT = path.resolve(import.meta.dirname, '..');
const DIST = path.join(ROOT, 'dist');
const SITE = 'https://ingadraper.com';
const AGENT_ID = `${SITE}/#agent`;
const BUSINESS_ID = `${SITE}/#business`;
const BROKERAGE_ID = `${SITE}/#brokerage`;
const WEBSITE_ID = `${SITE}/#website`;
const errors = [];

function fail(message) {
    errors.push(message);
}

function read(relativePath) {
    const absolutePath = path.join(ROOT, relativePath);
    if (!fs.existsSync(absolutePath)) {
        fail(`Missing required file: ${relativePath}`);
        return '';
    }
    return fs.readFileSync(absolutePath, 'utf8');
}

function evaluateLiteral(node, sourceFile) {
    if (ts.isStringLiteralLike(node)) return node.text;
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
    if (node.kind === ts.SyntaxKind.NullKeyword) return null;
    if (ts.isNumericLiteral(node)) return Number(node.text);
    if (ts.isParenthesizedExpression(node)) return evaluateLiteral(node.expression, sourceFile);
    if (ts.isArrayLiteralExpression(node)) {
        return node.elements.map((element) => evaluateLiteral(element, sourceFile));
    }
    if (ts.isObjectLiteralExpression(node)) {
        const value = {};
        for (const property of node.properties) {
            if (!ts.isPropertyAssignment(property)) {
                throw new Error(`Unsupported property in ${sourceFile.fileName}: ${property.getText(sourceFile)}`);
            }
            const key = ts.isComputedPropertyName(property.name)
                ? evaluateLiteral(property.name.expression, sourceFile)
                : property.name.text;
            value[key] = evaluateLiteral(property.initializer, sourceFile);
        }
        return value;
    }
    throw new Error(`Unsupported literal in ${sourceFile.fileName}: ${node.getText(sourceFile)}`);
}

function readExportedLiteral(relativePath, variableName) {
    const sourceText = read(relativePath);
    const sourceFile = ts.createSourceFile(relativePath, sourceText, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
    let initializer;
    function visit(node) {
        if (ts.isVariableDeclaration(node) && ts.isIdentifier(node.name) && node.name.text === variableName) {
            initializer = node.initializer;
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    if (!initializer) throw new Error(`Could not find ${variableName} in ${relativePath}`);
    return evaluateLiteral(initializer, sourceFile);
}

function isValidDate(value) {
    if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
    const parsed = new Date(`${value}T00:00:00Z`);
    return !Number.isNaN(parsed.valueOf()) && parsed.toISOString().slice(0, 10) === value;
}

function isHttpUrl(value) {
    try {
        const parsed = new URL(value);
        return (parsed.protocol === 'https:' || parsed.protocol === 'http:') && Boolean(parsed.hostname);
    } catch {
        return false;
    }
}

function decodeHtml(value = '') {
    return value
        .replace(/&quot;/g, '"')
        .replace(/&#39;|&apos;/g, "'")
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
        .replace(/&#x([\da-f]+);/gi, (_, number) => String.fromCodePoint(Number.parseInt(number, 16)));
}

function attribute(tag, name) {
    const match = tag.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`, 'i'));
    return match ? decodeHtml(match[1]) : undefined;
}

function metaContent(html, key, value) {
    const tags = html.match(/<meta\b[^>]*>/gi) ?? [];
    const tag = tags.find((candidate) => attribute(candidate, key) === value);
    return tag ? attribute(tag, 'content') : undefined;
}

function canonicalHref(html) {
    const links = (html.match(/<link\b[^>]*>/gi) ?? [])
        .filter((tag) => attribute(tag, 'rel')?.split(/\s+/).includes('canonical'));
    if (links.length !== 1) return { count: links.length, href: undefined };
    return { count: 1, href: attribute(links[0], 'href') };
}

function titleText(html) {
    const match = html.match(/<title>([\s\S]*?)<\/title>/i);
    return match ? decodeHtml(match[1].trim()) : undefined;
}

function inspectUndefined(value, location) {
    if (typeof value === 'string' && /(?:^|[/:])(?:undefined|null)(?:$|[/?#])/i.test(value)) {
        fail(`${location} contains an undefined/null URL value: ${value}`);
    } else if (Array.isArray(value)) {
        value.forEach((item, index) => inspectUndefined(item, `${location}[${index}]`));
    } else if (value && typeof value === 'object') {
        for (const [key, item] of Object.entries(value)) inspectUndefined(item, `${location}.${key}`);
    }
}

function collectIds(value, ids = new Set()) {
    if (Array.isArray(value)) {
        value.forEach((item) => collectIds(item, ids));
    } else if (value && typeof value === 'object') {
        if (typeof value['@id'] === 'string') ids.add(value['@id']);
        Object.values(value).forEach((item) => collectIds(item, ids));
    }
    return ids;
}

function collectNodes(value, nodes = []) {
    if (Array.isArray(value)) {
        value.forEach((item) => collectNodes(item, nodes));
    } else if (value && typeof value === 'object') {
        if (value['@type'] || value['@id']) nodes.push(value);
        Object.values(value).forEach((item) => collectNodes(item, nodes));
    }
    return nodes;
}

function jsonLdGraphs(html, route) {
    const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
    if (!scripts.length) fail(`${route} has no JSON-LD`);
    return scripts.flatMap((match, index) => {
        try {
            const graph = JSON.parse(match[1]);
            inspectUndefined(graph, `${route} JSON-LD ${index + 1}`);
            return [graph];
        } catch (error) {
            fail(`${route} has invalid JSON-LD ${index + 1}: ${error.message}`);
            return [];
        }
    });
}

let answerPages = [];
let sourceSets = {};
try {
    answerPages = [
        ...readExportedLiteral('src/content/answers.ts', 'baseAnswerPages'),
        ...readExportedLiteral('src/content/researchedAnswers.ts', 'researchedAnswerPages'),
    ];
    sourceSets = readExportedLiteral('src/content/sources.ts', 'sourceSets');
} catch (error) {
    fail(`Could not inspect answer source data: ${error.message}`);
}

const slugCounts = new Map();
for (const page of answerPages) slugCounts.set(page.slug, (slugCounts.get(page.slug) ?? 0) + 1);
for (const [slug, count] of slugCounts) {
    if (count > 1) fail(`Duplicate answer slug: ${slug}`);
}
const allSlugs = new Set(slugCounts.keys());

for (const page of answerPages) {
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(page.slug ?? '')) fail(`Invalid answer slug: ${page.slug}`);
    for (const field of ['datePublished', 'dateModified']) {
        if (!isValidDate(page[field])) fail(`${page.slug}.${field} is not a valid YYYY-MM-DD date: ${page[field]}`);
    }
    if (isValidDate(page.datePublished) && isValidDate(page.dateModified) && page.dateModified < page.datePublished) {
        fail(`${page.slug}.dateModified precedes datePublished`);
    }
    if (!Array.isArray(page.related) || page.related.length === 0) fail(`${page.slug} has no related routes`);
    const seenRelated = new Set();
    for (const relatedSlug of page.related ?? []) {
        if (relatedSlug === page.slug) fail(`${page.slug} links to itself as related content`);
        if (seenRelated.has(relatedSlug)) fail(`${page.slug} has duplicate related route: ${relatedSlug}`);
        if (!allSlugs.has(relatedSlug)) fail(`${page.slug} has invalid related route: ${relatedSlug}`);
        seenRelated.add(relatedSlug);
    }
}

const sourceKeys = Object.keys(sourceSets);
for (const slug of allSlugs) {
    if (!Object.hasOwn(sourceSets, slug)) fail(`Missing source set for answer slug: ${slug}`);
}
for (const key of sourceKeys) {
    if (!allSlugs.has(key)) fail(`Orphan source-set key: ${key}`);
    const sources = sourceSets[key];
    if (!Array.isArray(sources) || sources.length === 0) fail(`${key} has an empty source set`);
    for (const [index, source] of (sources ?? []).entries()) {
        if (!isHttpUrl(source.url)) fail(`${key} source ${index + 1} has an invalid URL: ${source.url}`);
        if (!isValidDate(source.checked)) fail(`${key} source ${index + 1} has a malformed checked date: ${source.checked}`);
    }
}

const visiblePages = answerPages.filter((page) => !page.needsVerification);
const expectedAnswerRoutes = new Map(
    visiblePages.map((page) => [`/answers/${page.slug}/`, page]),
);
const requiredRoutes = new Set(['/', '/answers/', ...expectedAnswerRoutes.keys()]);

for (const required of [
    'public/robots.txt',
    'public/llms.txt',
    'dist/robots.txt',
    'dist/llms.txt',
    'dist/sitemap-index.xml',
    'dist/sitemap-0.xml',
]) {
    read(required);
}

const publicRobots = read('public/robots.txt');
const robots = read('dist/robots.txt');
if (robots !== publicRobots) fail('dist/robots.txt does not match public/robots.txt');
if (!robots.includes(`Sitemap: ${SITE}/sitemap-index.xml`)) {
    fail('dist/robots.txt does not advertise the production sitemap index');
}

const publicLlms = read('public/llms.txt');
const llms = read('dist/llms.txt');
if (llms !== publicLlms) fail('dist/llms.txt does not match public/llms.txt');
const llmsEntries = [...llms.matchAll(/^- \[([^\]]+)\]\(https:\/\/ingadraper\.com(\/answers\/[a-z0-9-]+\/)\)/gm)]
    .map((match) => ({ title: match[1], route: match[2] }));
const llmsAnswerRoutes = llmsEntries.map((entry) => entry.route);
const llmsCounts = new Map();
for (const route of llmsAnswerRoutes) llmsCounts.set(route, (llmsCounts.get(route) ?? 0) + 1);
for (const [route, count] of llmsCounts) {
    if (count > 1) fail(`Duplicate llms.txt answer route: ${route}`);
    if (!expectedAnswerRoutes.has(route)) fail(`Stale llms.txt answer route: ${route}`);
}
for (const route of expectedAnswerRoutes.keys()) {
    if (!llmsCounts.has(route)) fail(`llms.txt is missing generated answer route: ${route}`);
}
for (const entry of llmsEntries) {
    const page = expectedAnswerRoutes.get(entry.route);
    if (page && entry.title !== page.question) fail(`llms.txt title drift for ${entry.route}`);
}

const answerOutputRoot = path.join(DIST, 'answers');
const generatedAnswerRoutes = fs.existsSync(answerOutputRoot)
    ? fs.readdirSync(answerOutputRoot, { withFileTypes: true })
        .filter((entry) => entry.isDirectory() && fs.existsSync(path.join(answerOutputRoot, entry.name, 'index.html')))
        .map((entry) => `/answers/${entry.name}/`)
        .sort()
    : [];
if (generatedAnswerRoutes.length !== expectedAnswerRoutes.size) {
    fail(`Answer route-count mismatch: expected ${expectedAnswerRoutes.size}, generated ${generatedAnswerRoutes.length}`);
}
for (const route of generatedAnswerRoutes) {
    if (!expectedAnswerRoutes.has(route)) fail(`Unexpected generated answer route: ${route}`);
}
for (const route of expectedAnswerRoutes.keys()) {
    if (!generatedAnswerRoutes.includes(route)) fail(`Missing generated answer route: ${route}`);
}

function findGeneratedRoutes(directory, relative = '') {
    if (!fs.existsSync(directory)) return [];
    return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const childRelative = path.posix.join(relative, entry.name);
        if (entry.isDirectory()) return findGeneratedRoutes(path.join(directory, entry.name), childRelative);
        if (!entry.isFile() || entry.name !== 'index.html') return [];
        const parent = path.posix.dirname(`/${childRelative}`);
        return [parent === '/' ? '/' : `${parent}/`];
    });
}

const generatedRoutes = new Set(findGeneratedRoutes(DIST));
for (const route of requiredRoutes) {
    if (!generatedRoutes.has(route)) fail(`Missing required generated route: ${route}`);
}

const sitemap = read('dist/sitemap-0.xml');
const sitemapRoutes = [...sitemap.matchAll(/<loc>(https:\/\/ingadraper\.com\/[^<]*)<\/loc>/g)].map((match) => {
    const url = new URL(match[1]);
    return url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
});
if (sitemapRoutes.length !== generatedRoutes.size) {
    fail(`Sitemap route-count mismatch: expected ${generatedRoutes.size}, found ${sitemapRoutes.length}`);
}
for (const route of generatedRoutes) {
    if (!sitemapRoutes.includes(route)) fail(`Sitemap is missing route: ${route}`);
}
for (const route of sitemapRoutes) {
    if (!generatedRoutes.has(route)) fail(`Sitemap has stale route: ${route}`);
}

for (const route of generatedRoutes) {
    const relativeHtml = route === '/'
        ? 'dist/index.html'
        : `dist${route}index.html`;
    const html = read(relativeHtml);
    if (!html) continue;
    if (/https?:[^"'<>\s]*(?:undefined|null)/i.test(html)) fail(`${route} contains an undefined/null URL`);

    const expectedUrl = `${SITE}${route}`;
    const canonical = canonicalHref(html);
    if (canonical.count !== 1) fail(`${route} must have exactly one canonical link; found ${canonical.count}`);
    if (canonical.href !== expectedUrl) fail(`${route} canonical mismatch: expected ${expectedUrl}, found ${canonical.href}`);

    const title = titleText(html);
    const description = metaContent(html, 'name', 'description');
    if (!title) fail(`${route} is missing a title`);
    if (!description) fail(`${route} is missing a meta description`);
    if (metaContent(html, 'property', 'og:title') !== title) fail(`${route} og:title does not match the document title`);
    if (metaContent(html, 'property', 'og:description') !== description) fail(`${route} og:description does not match the meta description`);
    if (metaContent(html, 'property', 'og:url') !== expectedUrl) fail(`${route} og:url does not match the canonical URL`);
    if (metaContent(html, 'name', 'twitter:title') !== title) fail(`${route} twitter:title does not match the document title`);
    if (metaContent(html, 'name', 'twitter:description') !== description) fail(`${route} twitter:description does not match the meta description`);
    const ogImage = metaContent(html, 'property', 'og:image');
    const twitterImage = metaContent(html, 'name', 'twitter:image');
    if (!isHttpUrl(ogImage) || !ogImage.startsWith(`${SITE}/`)) fail(`${route} is missing a canonical-domain og:image`);
    if (twitterImage !== ogImage) fail(`${route} twitter:image does not match og:image`);

    const detailPage = expectedAnswerRoutes.get(route);
    const expectedOgType = detailPage ? 'article' : 'website';
    if (metaContent(html, 'property', 'og:type') !== expectedOgType) {
        fail(`${route} og:type must be ${expectedOgType}`);
    }
    if (detailPage) {
        const expectedTitle = `${detailPage.title} | Inga Draper`;
        if (title !== expectedTitle) fail(`${route} title drift: expected ${expectedTitle}`);
        if (description !== detailPage.metaDescription) fail(`${route} meta-description drift from answer source`);
    }

    const graphs = jsonLdGraphs(html, route);
    const nodes = collectNodes(graphs);
    const agent = nodes.find((node) => node?.['@id'] === AGENT_ID && node?.['@type'] === 'Person');
    const business = nodes.find((node) => node?.['@id'] === BUSINESS_ID && node?.['@type'] === 'RealEstateAgent');
    const brokerage = nodes.find((node) => node?.['@id'] === BROKERAGE_ID && node?.['@type'] === 'RealEstateOrganization');
    const website = nodes.find((node) => node?.['@id'] === WEBSITE_ID && node?.['@type'] === 'WebSite');
    const lakeNormanCities = nodes.filter((node) => node?.['@type'] === 'City' && node?.name === 'Lake Norman, NC');
    if (lakeNormanCities.length) fail(`${route} incorrectly types Lake Norman, NC as City; use Place`);
    if (agent?.['@type'] !== 'Person') fail(`${route} does not emit the canonical Person entity ${AGENT_ID}`);
    if (business?.['@type'] !== 'RealEstateAgent') fail(`${route} does not emit the RealEstateAgent business entity ${BUSINESS_ID}`);
    if (brokerage?.['@type'] !== 'RealEstateOrganization') fail(`${route} does not emit the brokerage entity ${BROKERAGE_ID}`);
    if (website?.['@type'] !== 'WebSite') fail(`${route} does not emit the website entity ${WEBSITE_ID}`);
    const ids = collectIds(graphs);
    const article = nodes.find((node) => node?.['@type'] === 'Article');
    const breadcrumb = nodes.find((node) => node?.['@type'] === 'BreadcrumbList');

    if (detailPage) {
        if (!article) fail(`${route} is missing Article JSON-LD`);
        if (!breadcrumb) fail(`${route} is missing BreadcrumbList JSON-LD`);
        if (article) {
            if (article.url !== expectedUrl || article.mainEntityOfPage !== expectedUrl) {
                fail(`${route} Article URL fields do not match the canonical URL`);
            }
            if (article.headline !== detailPage.title || article.description !== detailPage.metaDescription) {
                fail(`${route} Article text fields drift from answer source`);
            }
            if (article.datePublished !== detailPage.datePublished || article.dateModified !== detailPage.dateModified) {
                fail(`${route} Article dates drift from answer source`);
            }
            if (article.author?.['@id'] !== AGENT_ID || !ids.has(article.author?.['@id'])) {
                fail(`${route} Article author does not resolve to the emitted agent entity`);
            }
            if (article.publisher?.['@id'] !== BUSINESS_ID || !ids.has(article.publisher?.['@id'])) {
                fail(`${route} Article publisher does not resolve to the emitted RealEstateAgent business entity`);
            }
        }
        if (breadcrumb) {
            const items = breadcrumb.itemListElement ?? [];
            const expectedItems = [`${SITE}/`, `${SITE}/answers/`, expectedUrl];
            if (items.length !== expectedItems.length) fail(`${route} breadcrumb item count mismatch`);
            expectedItems.forEach((url, index) => {
                if (items[index]?.position !== index + 1 || items[index]?.item !== url) {
                    fail(`${route} breadcrumb item ${index + 1} must be ${url}`);
                }
            });
        }

        const relatedHrefs = [...html.matchAll(/href="(\/answers\/[a-z0-9-]+\/)"/g)].map((match) => match[1]);
        for (const href of relatedHrefs) {
            if (href !== '/answers/' && !expectedAnswerRoutes.has(href)) fail(`${route} has an invalid generated answer link: ${href}`);
        }
    }
}

if (errors.length) {
    console.error(`AEO validation failed with ${errors.length} error(s):`);
    errors.forEach((error) => console.error(`- ${error}`));
    process.exit(1);
}

console.log(`AEO validation passed: ${answerPages.length} source answers, ${visiblePages.length} generated answer routes, ${generatedRoutes.size} total routes.`);
