import { Building2, KeyRound, Route, ShieldCheck } from 'lucide-react';

const services = [
    {
        title: 'Buy with context',
        description: 'A grounded plan for neighborhoods, offer strategy, inspections, timelines, and the tradeoffs that matter before you write.',
        icon: KeyRound,
    },
    {
        title: 'Sell with intention',
        description: 'Pricing, prep, positioning, and negotiation support designed around your timeline and the real buyer pool.',
        icon: ShieldCheck,
    },
    {
        title: 'Relocate with clarity',
        description: 'Practical Charlotte-area guidance for clients comparing commute patterns, schools, lifestyle, and long-term fit.',
        icon: Route,
    },
    {
        title: 'Plan property strategy',
        description: 'Helpful conversations for investment properties, short-term rentals, and property management next steps.',
        icon: Building2,
    },
];

export default function Services() {
    return (
        <section id="services" className="section-band bg-ivory">
            <div className="site-shell">
                <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
                    <div>
                        <p className="eyebrow">How Inga helps</p>
                        <h2 className="mt-4 text-4xl font-semibold sm:text-5xl">
                            Focused guidance for the questions that shape your next move.
                        </h2>
                    </div>
                    <p className="max-w-2xl text-lg text-smoke lg:justify-self-end">
                        Whether you are comparing neighborhoods, preparing to sell, relocating to the Charlotte area, or exploring income property, Inga helps turn the moving pieces into a clear plan.
                    </p>
                </div>

                <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service) => {
                        const Icon = service.icon;

                        return (
                            <article key={service.title} className="soft-card p-6">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mist text-olive">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                                <p className="mt-3 text-sm text-smoke">{service.description}</p>
                            </article>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}