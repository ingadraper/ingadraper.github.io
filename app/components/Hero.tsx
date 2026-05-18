import { ArrowRight, MapPin, PlayCircle } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export default function Hero() {
    const heroImage = siteConfig.images.hero;
    const youtubeUrl = siteConfig.links.youtube;
    const youtubeChannelName = siteConfig.youtube.channelName;

    return (
        <section id="top" className="relative min-h-[92svh] overflow-hidden bg-ink text-ivory">
            <img
                src={heroImage.src}
                alt={heroImage.alt}
                className="absolute inset-0 h-full w-full object-cover opacity-[0.76]"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-ink/95 via-ink/76 to-ink/28" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/44 via-transparent to-ink/24" />
            <div className="absolute inset-x-0 top-0 z-20 border-b border-white/14 bg-ink/18 backdrop-blur-md">
                <nav className="site-shell flex min-h-20 items-center justify-between text-sm">
                    <a href="#top" className="font-display text-2xl font-semibold text-ivory">
                        Inga Draper
                    </a>
                    <div className="hidden items-center gap-8 text-ivory/78 md:flex">
                        <a href="#about" className="transition hover:text-ivory">About</a>
                        <a href="#services" className="transition hover:text-ivory">Services</a>
                        <a href="#reviews" className="transition hover:text-ivory">Reviews</a>
                        <a href="#contact" className="rounded-[6px] border border-white/25 px-4 py-2 text-ivory transition hover:border-white hover:bg-white/10">
                            Contact
                        </a>
                    </div>
                </nav>
            </div>

            <div className="site-shell relative z-10 flex min-h-[92svh] items-end pb-16 pt-36 sm:pb-20 lg:pb-24">
                <div className="max-w-4xl">
                    <p className="mb-5 inline-flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-ivory/88">
                        <MapPin className="h-4 w-4" /> Inga Draper | Charlotte + Lake Norman real estate
                    </p>

                    <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] text-ivory sm:text-5xl lg:text-7xl">
                        Real estate guidance with clarity, care, and a local point of view.
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg text-ivory/88 sm:text-xl">
                        Inga Draper helps buyers, sellers, relocation clients, and investors move through Charlotte-area real estate with thoughtful strategy and honest conversation.
                    </p>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <a href="#contact" className="btn-primary bg-ivory text-ink hover:bg-mist focus:ring-ivory focus:ring-offset-ink">
                            Start a conversation
                            <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href={youtubeUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary border-white/30 bg-ink/90 text-ivory shadow-[0_18px_44px_rgba(0,0,0,0.24)] hover:border-white/50 hover:bg-ink focus:ring-ivory focus:ring-offset-ink">
                            <PlayCircle className="h-4 w-4" />
                            Watch {youtubeChannelName}
                        </a>
                    </div>
                </div>
            </div>

            <div className="relative z-10 border-t border-white/12 bg-ivory/95 text-ink backdrop-blur">
                <div className="site-shell grid gap-6 py-6 sm:grid-cols-3">
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-smoke">Brokerage</p>
                        <p className="mt-1 font-semibold">eXp Realty</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-smoke">Zillow Rating</p>
                        <p className="mt-1 font-semibold">5.0 from verified buyers</p>
                    </div>
                    <div>
                        <p className="text-xs uppercase tracking-[0.22em] text-smoke">Focus Areas</p>
                        <p className="mt-1 font-semibold">Charlotte, Huntersville, Cornelius</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
