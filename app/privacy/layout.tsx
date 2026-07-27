import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy · Dynamic Profile',
  description:
    'Dynamic Profile privacy policy — how we collect, use, and protect your personal information when you use our personal homepage builder.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Privacy Policy · Dynamic Profile',
    description:
      'Dynamic Profile privacy policy — how we collect, use, and protect your personal information.',
  },
  twitter: {
    title: 'Privacy Policy · Dynamic Profile',
    description:
      'Dynamic Profile privacy policy — how we collect, use, and protect your personal information.',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
