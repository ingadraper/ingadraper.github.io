import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import './globals.css';
import { siteConfig } from './siteConfig';

export const metadata: Metadata = {
    metadataBase: new URL('https://ingadraper.com'),
    title: 'Inga Draper | Charlotte Real Estate Advisor',
    description: 'Charlotte and Lake Norman real estate guidance from Inga Draper, eXp Realty. Buyer, seller, relocation, investment, and property management conversations.',
    keywords: 'real estate agent, Charlotte NC, Huntersville, real estate broker, buy home, sell home',
    authors: [{ name: 'Inga Draper' }],
    alternates: {
        canonical: '/',
    },
    openGraph: {
        title: 'Inga Draper | Charlotte Real Estate Advisor',
        description: 'Real estate guidance for Charlotte, Huntersville, Cornelius, and Lake Norman.',
        type: 'website',
        url: 'https://ingadraper.com',
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const chatWidgetId = siteConfig.connectors.goHighLevelChatWidgetId || process.env.NEXT_PUBLIC_GHL_CHAT_WIDGET_ID;

    return (
        <html lang="en">
            <head>
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='75' font-size='75' fill='%23D4C9C1'>I</text></svg>" />
            </head>
            <body>
                {children}
                {chatWidgetId ? (
                    <Script
                        src="https://widgets.leadconnectorhq.com/loader.js"
                        strategy="afterInteractive"
                        data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js"
                        data-widget-id={chatWidgetId}
                    />
                ) : null}
            </body>
        </html>
    );
}
