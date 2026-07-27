import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blog · Personal Brand & Portfolio Tips',
  description:
    'In-depth articles about personal branding, portfolio showcase tips, link-in-bio alternatives, and no-code website building. Stand out online with a magazine-style personal homepage.',
  openGraph: {
    title: 'Blog · Dynamic Profile',
    description:
      'Tips and guides on personal branding, portfolio building, and making the most of your Dynamic Profile homepage.',
  },
  twitter: {
    title: 'Blog · Dynamic Profile',
    description:
      'Tips and guides on personal branding, portfolio building, and making the most of your Dynamic Profile homepage.',
  },
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
