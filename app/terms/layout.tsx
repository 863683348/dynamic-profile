import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service · Dynamic Profile',
  description:
    'Dynamic Profile terms of service. By using our personal homepage builder, you agree to these terms and conditions.',
  robots: { index: false, follow: true },
  openGraph: {
    title: 'Terms of Service · Dynamic Profile',
    description:
      'Dynamic Profile terms of service. By using our personal homepage builder, you agree to these terms and conditions.',
  },
  twitter: {
    title: 'Terms of Service · Dynamic Profile',
    description:
      'Dynamic Profile terms of service. By using our personal homepage builder, you agree to these terms and conditions.',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
