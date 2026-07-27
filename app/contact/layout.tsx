import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us · Dynamic Profile',
  description:
    'Have questions or suggestions? Get in touch with the Dynamic Profile team. We build the no-code magazine-style personal homepage builder.',
  openGraph: {
    title: 'Contact Us · Dynamic Profile',
    description:
      'Have questions or suggestions? Get in touch with the Dynamic Profile team.',
  },
  twitter: {
    title: 'Contact Us · Dynamic Profile',
    description:
      'Have questions or suggestions? Get in touch with the Dynamic Profile team.',
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
