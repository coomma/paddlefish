'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next-intl/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const onSelectChange = (value: string) => {
    router.replace(pathname, { locale: value });
  };

  return (
    <div className="ml-4">
        <Select defaultValue={locale} onValueChange={onSelectChange}>
          <SelectTrigger className="w-auto">
            <SelectValue placeholder={t('label')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">{t('en')}</SelectItem>
            <SelectItem value="de">{t('de')}</SelectItem>
            <SelectItem value="fr">{t('fr')}</SelectItem>
            <SelectItem value="ja">{t('ja')}</SelectItem>
            <SelectItem value="es">{t('es')}</SelectItem>
          </SelectContent>
        </Select>
    </div>
  );
}
