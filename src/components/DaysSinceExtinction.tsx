'use client';

import { useState, useEffect } from 'react';

const EXTINCTION_DECLARED_DATE = new Date('2022-07-20');

const DaysSinceExtinction = () => {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    const today = new Date();
    const diffTime = today.getTime() - EXTINCTION_DECLARED_DATE.getTime();
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
  }, []);

  if (days === null) {
    return (
       <p className="text-center text-lg text-foreground/80 mt-4 animate-pulse">
          Calculating days since goodbye...
        </p>
    );
  }

  return (
    <p className="text-center text-lg text-foreground/80 mt-4">
      Today marks day {days} since the Chinese Paddlefish was declared extinct.
    </p>
  );
};

export default DaysSinceExtinction;
