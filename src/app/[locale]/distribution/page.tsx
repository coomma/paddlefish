import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import Image from "next/image";

export default function DistributionPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('DistributionPage');

  return (
    <div className="max-w-4xl mx-auto">
       <header className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">{t('title')}</h1>
        <p className="text-lg text-foreground/80">{t('subtitle')}</p>
      </header>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="font-headline text-3xl text-primary">{t('cardTitle')}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed">
            {t('p1')}
          </p>
          <div className="my-6 border rounded-lg overflow-hidden shadow-md">
            <Image 
              src="https://placehold.co/800x500.png"
              alt="Map of the Yangtze River showing the historical distribution of the Chinese Paddlefish"
              width={800}
              height={500}
              data-ai-hint="Yangtze river map"
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-foreground/90 leading-relaxed">
            {t('p2')}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
