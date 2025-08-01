'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';

const EXTINCTION_DECLARED_DATE = new Date('2022-07-21');

const DaysSinceExtinction = () => {
  const [days, setDays] = useState<number | null>(null);
  const t = useTranslations('DaysSinceExtinction');

  useEffect(() => {
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - EXTINCTION_DECLARED_DATE.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  if (days === null) {
    return (
       <p className="text-center text-lg text-foreground/80 mt-4 animate-pulse">
          {t('calculating')}
        </p>
    );
  }

  return (
    <p className="text-center text-lg text-foreground/80 mt-4">
      {t('daysSince', {days})}
    </p>
  );
};

export default DaysSinceExtinction;
