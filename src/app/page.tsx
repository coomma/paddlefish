import { redirect } from 'next/navigation';

// This is the root page, which redirects to the default locale.
// All pages are now under src/app/[locale]
export default function RootPage() {
  redirect('/en');
}
