import { auth } from '@/auth';
import { loadAnalytics } from '@/lib/analytics';
import { AnalyticsClient } from '@/components/AnalyticsClient';

export default async function AnalyticsPage() {
  const session = await auth();
  const ownerId = session?.user?.id;
  const result = ownerId
    ? await loadAnalytics(ownerId)
    : { kind: 'unauth' as const };
  return <AnalyticsClient result={result} />;
}
