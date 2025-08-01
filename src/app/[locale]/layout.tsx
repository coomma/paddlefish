import type { Metadata } from 'next';
import { Inter, Literata } from 'next/font/google';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { NextIntlClientProvider, useMessages } from 'next-intl';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const literata = Literata({ subsets: ['latin'], variable: '--font-literata' });

export const metadata: Metadata = {
  title: 'Psephurus: A Requiem',
  description: 'A memorial for the extinct Chinese Paddlefish (Psephurus gladius)',
};

export default function LocaleLayout({
  children,
  params: {locale}
}: Readonly<{
  children: React.ReactNode;
  params: {locale: string};
}>) {
  const messages = useMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${literata.variable}`}>
       <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Literata:ital,opsz,wght@0,24..144,400..700;1,24..144,400..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
            <Toaster />
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
