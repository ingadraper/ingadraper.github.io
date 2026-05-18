import { ArrowUpRight, Star } from 'lucide-react';
import { siteConfig } from '../siteConfig';

export default function Reviews() {
    const reviews = [
        {
            name: 'Nicole Rodzen',
            date: 'February 2026',
            text: '"Inga\'s spiel about being your realtor and your best friend is actually true. Somewhere along the way, she really did become someone I value beyond the transaction."',
            transaction: 'Bought a home in Huntersville, NC',
        },
        {
            name: 'Blake Cole',
            date: 'May 2024',
            text: '"Inga did an outstanding job working with me and making sure my needs were met. She was able to help negotiate a lower price for the home I purchased."',
            transaction: 'Bought a Single Family home in Huntersville, NC',
        },
    ];

    return (
        <section id="reviews" className="section-band bg-ivory">
            <div className="site-shell">
                <div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]">
                    <div>
                        <p className="eyebrow">Client trust</p>
                        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                            Client feedback grounded in real relationships.
                        </h2>
                        <p className="mt-6 text-lg text-smoke">
                            Buyers describe Inga as steady, thoughtful, and deeply invested in helping them feel supported beyond the transaction itself.
                        </p>

                        <a
                            href={siteConfig.links.zillow}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary mt-9"
                        >
                            View Zillow profile
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {reviews.map((review) => (
                            <article key={review.name} className="soft-card p-7">
                                <div className="flex gap-1 text-clay" aria-label="5 star review">
                                    {Array.from({ length: 5 }).map((_, index) => (
                                        <Star key={index} className="h-4 w-4 fill-current" />
                                    ))}
                                </div>
                                <p className="mt-6 text-lg text-ink">{review.text}</p>
                                <div className="mt-8 border-t border-line pt-5">
                                    <p className="font-semibold text-ink">{review.name}</p>
                                    <p className="mt-1 text-sm text-smoke">{review.transaction}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.18em] text-smoke">{review.date}</p>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
