import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  locales: ['en', 'de', 'fr', 'ja', 'es'],
  defaultLocale: 'en'
});
 
export const config = {
  matcher: ['/', '/(de|fr|ja|es|en)/:path*']
};