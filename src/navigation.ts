import {
  createLocalizedPathnamesNavigation,
  Pathnames
} from 'next-intl/navigation';
import { locales } from '@/lib/constants';

export const pathnames = {
  '/': '/',
} satisfies Pathnames<typeof locales>;

export const {Link, redirect, usePathname, useRouter} =
  createLocalizedPathnamesNavigation({locales, pathnames});
