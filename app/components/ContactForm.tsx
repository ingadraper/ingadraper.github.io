'use client';

import { ArrowRight, CalendarDays, Mail, MapPin, Phone } from 'lucide-react';
import { useState } from 'react';
import { siteConfig } from '../siteConfig';

const ghlFormUrl = siteConfig.connectors.goHighLevelFormUrl || process.env.NEXT_PUBLIC_GHL_FORM_URL;
const ghlCalendarUrl = siteConfig.connectors.goHighLevelCalendarUrl || process.env.NEXT_PUBLIC_GHL_CALENDAR_URL;
const { contact, links } = siteConfig;

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sent'>('idle');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setFormData((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const subject = encodeURIComponent('Real estate inquiry from ingadraper.com');
        const body = encodeURIComponent(
            `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone || 'Not provided'}\n\nMessage:\n${formData.message}`
        );

        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
        setStatus('sent');
        setFormData({ name: '', email: '', phone: '', message: '' });
    };

    return (
        <section id="contact" className="section-band bg-ink text-ivory">
            <div className="site-shell">
                <div className="grid gap-12 lg:grid-cols-[0.82fr_1fr] lg:items-start">
                    <div>
                        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-rose">Let&apos;s talk</p>
                        <h2 className="mt-4 text-4xl font-semibold text-ivory sm:text-5xl">
                            Start with a quick note.
                        </h2>
                        <p className="mt-6 max-w-xl text-lg leading-8 text-ivory/72">
                            Share where you are in the process. Inga can help you think through timing, options, and the next practical move.
                        </p>

                        <div className="mt-9 space-y-5 text-sm text-ivory/78">
                            <div className="flex gap-3">
                                <Phone className="mt-0.5 h-5 w-5 text-rose" />
                                <div>
                                    <p className="font-semibold text-ivory">Phone</p>
                                    <a href={contact.phoneHref} className="transition hover:text-white">
                                        {contact.phone}
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <Mail className="mt-0.5 h-5 w-5 text-rose" />
                                <div>
                                    <p className="font-semibold text-ivory">Email</p>
                                    <a href={`mailto:${contact.email}`} className="transition hover:text-white">
                                        {contact.email}
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <MapPin className="mt-0.5 h-5 w-5 text-rose" />
                                <div>
                                    <p className="font-semibold text-ivory">Service area</p>
                                    <p>Charlotte, Huntersville, Cornelius, Lake Norman & surrounding areas</p>
                                </div>
                            </div>

                            {ghlCalendarUrl ? (
                                <div className="flex gap-3">
                                    <CalendarDays className="mt-0.5 h-5 w-5 text-rose" />
                                    <div>
                                        <p className="font-semibold text-ivory">Consultation calendar</p>
                                        <a href={ghlCalendarUrl} target="_blank" rel="noopener noreferrer" className="transition hover:text-white">
                                            Book a time with Inga
                                        </a>
                                    </div>
                                </div>
                            ) : null}
                        </div>

                        <div className="mt-10 flex flex-wrap gap-3">
                            <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/18 bg-white/8 text-ivory shadow-none hover:border-white hover:bg-white/12">
                                Instagram
                            </a>
                            <a href={links.facebook} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/18 bg-white/8 text-ivory shadow-none hover:border-white hover:bg-white/12">
                                Facebook
                            </a>
                            <a href={links.youtube} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/18 bg-white/8 text-ivory shadow-none hover:border-white hover:bg-white/12">
                                YouTube
                            </a>
                            <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/18 bg-white/8 text-ivory shadow-none hover:border-white hover:bg-white/12">
                                LinkedIn
                            </a>
                        </div>
                    </div>

                    <div className="rounded-[8px] border border-white/14 bg-white p-3 text-ink shadow-[0_30px_90px_rgba(0,0,0,0.25)]">
                        {ghlFormUrl ? (
                            <iframe
                                src={ghlFormUrl}
                                title="Contact Inga Draper"
                                className="min-h-[620px] w-full rounded-[6px] border-0"
                                loading="lazy"
                            />
                        ) : (
                            <form onSubmit={handleSubmit} className="p-5 sm:p-7">
                                <p className="eyebrow">Contact Inga</p>
                                <h3 className="mt-3 text-3xl font-semibold">Tell Inga what you are considering.</h3>
                                <p className="mt-3 text-sm leading-6 text-smoke">
                                    A short note is enough. Share what you are weighing, and Inga can help you decide what makes sense next.
                                </p>

                                <div className="mt-7 space-y-4">
                                    <div>
                                        <label htmlFor="name" className="mb-2 block text-sm font-semibold text-ink">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full rounded-[6px] border border-line bg-porcelain px-4 py-3 outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/15"
                                        />
                                    </div>

                                    <div className="grid gap-4 sm:grid-cols-2">
                                        <div>
                                            <label htmlFor="email" className="mb-2 block text-sm font-semibold text-ink">
                                                Email
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                                className="w-full rounded-[6px] border border-line bg-porcelain px-4 py-3 outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/15"
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone" className="mb-2 block text-sm font-semibold text-ink">
                                                Phone
                                            </label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleChange}
                                                className="w-full rounded-[6px] border border-line bg-porcelain px-4 py-3 outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/15"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="mb-2 block text-sm font-semibold text-ink">
                                            What are you thinking about?
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows={5}
                                            required
                                            className="w-full resize-none rounded-[6px] border border-line bg-porcelain px-4 py-3 outline-none transition focus:border-olive focus:ring-2 focus:ring-olive/15"
                                            placeholder="Buying, selling, relocating, investing, or property management..."
                                        />
                                    </div>
                                </div>

                                {status === 'sent' ? (
                                    <p className="mt-4 rounded-[6px] bg-mist px-4 py-3 text-sm text-olive">
                                        Your email app should open with the details prefilled.
                                    </p>
                                ) : null}

                                <button type="submit" className="btn-primary mt-6 w-full">
                                    Email these details
                                    <ArrowRight className="h-4 w-4" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
