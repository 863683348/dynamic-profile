import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing · Free vs Pro Plans',
  description:
    'Dynamic Profile offers Free and Pro plans. Start free with your personal homepage, upgrade to Pro to remove branding, unlock advanced themes, and get analytics. Save with yearly billing.',
  openGraph: {
    title: 'Pricing · Dynamic Profile | Free vs Pro Plans',
    description:
      'Create your personal homepage for free. Upgrade to Pro to unlock advanced themes, remove branding, and access analytics.',
  },
  twitter: {
    title: 'Pricing · Dynamic Profile | Free vs Pro Plans',
    description:
      'Create your personal homepage for free. Upgrade to Pro to unlock advanced themes, remove branding, and access analytics.',
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
