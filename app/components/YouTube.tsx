import { ArrowUpRight } from 'lucide-react';
import { siteConfig } from '../siteConfig';

const topics = [
    'Neighborhood fit across Charlotte and Lake Norman',
    'What buyers should understand before touring',
    'Honest local perspective without the sales pitch',
];

export default function YouTube() {
    const youtubeUrl = siteConfig.links.youtube;
    const channelName = siteConfig.youtube.channelName;
    const featuredEmbedUrl = siteConfig.youtube.featuredEmbedUrl;

    return (
        <section className="section-band bg-porcelain">
            <div className="site-shell">
                <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
                    <div className="overflow-hidden rounded-[8px] border border-line bg-ink shadow-[0_24px_70px_rgba(38,37,34,0.12)]">
                        <iframe
                            src={featuredEmbedUrl}
                            title={`${channelName} featured video`}
                            className="aspect-video w-full border-0"
                            loading="lazy"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        />
                    </div>

                    <div>
                        <p className="eyebrow">{channelName}</p>
                        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                            A local voice clients can get to know before they call.
                        </h2>
                        <p className="mt-6 text-lg text-smoke">
                            Inga&apos;s YouTube channel shares a more personal view of the Charlotte area: the neighborhoods, the tradeoffs, the practical details, and the everyday questions people ask before they make a move.
                        </p>

                        <div className="mt-8 space-y-3">
                            {topics.map((topic) => (
                                <div key={topic} className="flex items-start gap-3 border-t border-line pt-3 text-sm text-smoke">
                                    <ArrowUpRight className="mt-0.5 h-4 w-4 text-olive" />
                                    <span>{topic}</span>
                                </div>
                            ))}
                        </div>

                        <a
                            href={youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-secondary mt-9"
                        >
                            Visit the channel
                            <ArrowUpRight className="h-4 w-4" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
