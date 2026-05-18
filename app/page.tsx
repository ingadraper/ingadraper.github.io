'use client';

import About from './components/About';
import ContactForm from './components/ContactForm';
import Hero from './components/Hero';
import Reviews from './components/Reviews';
import Services from './components/Services';
import YouTube from './components/YouTube';
import { siteConfig } from './siteConfig';

export default function Home() {
    return (
        <main className="min-h-screen bg-ivory">
            <Hero />
            <About />
            <Services />
            <YouTube />
            <Reviews />
            <ContactForm />

            <footer className="bg-porcelain py-12 text-ink">
                <div className="site-shell">
                    <div className="grid gap-8 border-b border-line pb-8 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h3 className="font-display text-2xl font-semibold">Inga Draper</h3>
                            <p className="mt-4 text-sm text-smoke">
                                eXp Realty agent serving Charlotte, Huntersville, Cornelius, and Lake Norman.
                            </p>
                        </div>

                        <div>
                            <h4 className="font-semibold">Explore</h4>
                            <ul className="mt-4 space-y-2 text-sm text-smoke">
                                <li><a href="#about" className="transition hover:text-ink">About</a></li>
                                <li><a href="#services" className="transition hover:text-ink">Services</a></li>
                                <li><a href="#reviews" className="transition hover:text-ink">Reviews</a></li>
                                <li><a href="#contact" className="transition hover:text-ink">Contact</a></li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold">Credentials</h4>
                            <ul className="mt-4 space-y-2 text-sm text-smoke">
                                <li>eXp Realty Agent</li>
                                <li>NC Licensed Realtor</li>
                                <li>5.0 Star Rating</li>
                                <li>Buyer, seller, relocation, investment</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold">Connect</h4>
                            <ul className="mt-4 space-y-2 text-sm text-smoke">
                                <li><a href={siteConfig.contact.phoneHref} className="transition hover:text-ink">{siteConfig.contact.phone}</a></li>
                                <li><a href={`mailto:${siteConfig.contact.email}`} className="transition hover:text-ink">Email Inga</a></li>
                                <li><a href={siteConfig.links.youtube} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">{siteConfig.youtube.channelName}</a></li>
                                <li><a href={siteConfig.links.facebook} target="_blank" rel="noopener noreferrer" className="transition hover:text-ink">Facebook</a></li>
                                <li>Charlotte, NC 28216</li>
                            </ul>
                        </div>
                    </div>

                    <p className="pt-8 text-sm text-smoke">
                        © 2026 Inga Draper Real Estate. eXp Realty. Equal Housing Opportunity.
                    </p>
                </div>
            </footer>
        </main>
    );
}
