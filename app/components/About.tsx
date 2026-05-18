import { BadgeCheck, Home, TrendingUp } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export default function About() {
    const aboutImage = siteConfig.images.about;
    const stats = [
        { label: 'Zillow rating', value: '5.0' },
        { label: 'Recent sales', value: '3' },
        { label: 'Avg. closed price', value: '$347K' },
    ];

    return (
        <section id="about" className="section-band bg-porcelain">
            <div className="site-shell">
                <div className="grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
                    <div className="relative min-h-[420px] overflow-hidden rounded-[8px] bg-ink sm:min-h-[520px] lg:min-h-[560px]">
                        <img
                            src={aboutImage.src}
                            alt={aboutImage.alt}
                            className="absolute inset-0 h-full w-full object-cover brightness-[0.94] saturate-[0.92]"
                        />
                        <div className="absolute inset-x-5 bottom-5 rounded-[6px] border border-line/70 bg-ivory/95 p-5 shadow-[0_16px_40px_rgba(38,37,34,0.10)] sm:inset-x-6 sm:bottom-6 sm:p-6">
                            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-olive">Working style</p>
                            <p className="mt-3 max-w-2xl text-lg font-semibold leading-7 text-ink">
                                Clear choices, candid tradeoffs, and calm guidance from first conversation to closing.
                            </p>
                        </div>
                    </div>

                    <div>
                        <p className="eyebrow">Meet Inga</p>
                        <h2 className="mt-4 max-w-2xl text-4xl font-semibold sm:text-5xl">
                            Thoughtful representation for one of life&apos;s bigger decisions.
                        </h2>

                        <p className="mt-6 text-lg text-smoke">
                            Buying or selling a home is a big decision, and my goal is to make the process feel clear and manageable from start to finish. Working with the wrong agent can be a 6-figure mistake.
                        </p>

                        <p className="mt-5 text-lg text-smoke">
                            I work with clients across Charlotte and the surrounding areas, guiding them through their options with a steady, thoughtful approach. Some moves happen quickly, and others take time. My role is to help you understand your choices, talk through tradeoffs honestly, and make decisions that align with your goals.
                        </p>

                        <div className="mt-8 grid gap-3 sm:grid-cols-3">
                            {stats.map((stat) => (
                                <div key={stat.label} className="soft-card p-5">
                                    <p className="font-display text-3xl font-semibold text-ink">{stat.value}</p>
                                    <p className="mt-1 text-sm text-smoke">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 grid gap-4 sm:grid-cols-3">
                            <div className="flex items-start gap-3">
                                <BadgeCheck className="mt-1 h-5 w-5 text-olive" />
                                <p className="text-sm text-smoke"><span className="font-semibold text-ink">eXp Realty</span><br />Licensed North Carolina agent</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <Home className="mt-1 h-5 w-5 text-olive" />
                                <p className="text-sm text-smoke"><span className="font-semibold text-ink">Buyer focused</span><br />First-time, relocation, and local moves</p>
                            </div>
                            <div className="flex items-start gap-3">
                                <TrendingUp className="mt-1 h-5 w-5 text-olive" />
                                <p className="text-sm text-smoke"><span className="font-semibold text-ink">Investor aware</span><br />Short-term rental and property strategy</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
