
'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { NAV_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { Fish, Menu } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from '../ui/button';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const t = useTranslations('Header');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const closeSheet = () => setIsSheetOpen(false);

  return (
    <header className="bg-card/80 backdrop-blur-sm sticky top-0 z-40 border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
          <Fish className="h-6 w-6" />
          <span className="font-headline text-xl font-bold">Psephurus</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-1">
          <nav className="flex items-center space-x-1">
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
                  {t(link.label.toLowerCase() as any)}
                </Link>
              );
            })}
          </nav>
          <LanguageSwitcher />
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden flex items-center">
           <LanguageSwitcher />
           <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="ml-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col space-y-4 mt-8">
                {NAV_LINKS.map((link) => {
                  const isActive = link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeSheet}
                      className={cn(
                        'px-3 py-2 rounded-md text-lg font-medium transition-colors',
                        isActive
                          ? 'bg-primary/10 text-primary'
                          : 'text-foreground/70 hover:bg-primary/5 hover:text-primary'
                      )}
                    >
                      {t(link.label.toLowerCase() as any)}
                    </Link>
                  );
                })}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
