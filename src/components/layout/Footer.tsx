import { useTranslations } from "next-intl";

export default function Footer() {
  const t = useTranslations('Footer');
  return (
    <footer className="bg-card/50 border-t">
      <div className="container mx-auto py-6 px-4 text-center text-sm text-foreground/60">
        <p>{t('inMemoriam')}</p>
      </div>
    </footer>
  );
}
