import createMiddleware from 'next-intl/middleware';
import { pathnames } from './navigation';
import { locales } from './i18n';
 
export default createMiddleware({
  defaultLocale: 'en',
  locales,
  pathnames,
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/([\\w-]+)'],
};
