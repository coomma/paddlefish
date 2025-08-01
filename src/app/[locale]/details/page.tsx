import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function DetailsPage({params: {locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations('DetailsPage');

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
        <CardContent className="space-y-4 text-foreground/90 leading-relaxed">
          <p>
            {t('p1')}
          </p>
          <p>
           {t('p2')}
          </p>
           <p dangerouslySetInnerHTML={{ __html: t.raw('p3')}} />
        </CardContent>
      </Card>
    </div>
  );
}
