import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'FAQ · Dynamic Profile Help Center',
  description:
    'Frequently asked questions about Dynamic Profile — sign up, usage, pricing, and features. Get help building your no-code personal homepage.',
  openGraph: {
    title: 'FAQ · Dynamic Profile Help Center',
    description:
      'Frequently asked questions about Dynamic Profile — sign up, usage, pricing, and features.',
  },
  twitter: {
    title: 'FAQ · Dynamic Profile Help Center',
    description:
      'Frequently asked questions about Dynamic Profile — sign up, usage, pricing, and features.',
  },
};

export default function FaqLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
