'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Fish } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Fish className="h-6 w-6" />
          <span className="font-headline text-xl font-bold">Psephurus</span>
        </Link>
        <div className="flex items-center space-x-1">
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_LINKS.map((link) => {
              const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'px-3 py-2 rounded-md text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          {/* Language Switcher can be re-added here */}
        </div>
        {/* Mobile menu could be added here */}
      </div>
    </header>
  );
}
