import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import { AppProvider } from '@/context/AppContext';
import './globals.css';

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
});

const jakarta = Plus_Jakarta_Sans({
  variable: '--font-jakarta',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Srishti Studios | Crafting Worlds Worth Remembering',
  description: 'We build immersive interactive experiences inspired by timeless creativity and modern technology. Discover our premium AAA games.',
  keywords: 'Srishti Studios, game development, premium games, game design, Indian game studio, indie games, AAA games, gaming',
  openGraph: {
    title: 'Srishti Studios | Crafting Worlds Worth Remembering',
    description: 'We build immersive interactive experiences inspired by timeless creativity and modern technology.',
    type: 'website',
    url: 'https://srishti-studios.com',
    siteName: 'Srishti Studios',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Srishti Studios | Crafting Worlds Worth Remembering',
    description: 'We build immersive interactive experiences inspired by timeless creativity and modern technology.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full dark select-none">
      <body className={`${cormorant.variable} ${jakarta.variable} bg-charcoal text-ivory min-h-screen flex flex-col antialiased stone-noise`}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
