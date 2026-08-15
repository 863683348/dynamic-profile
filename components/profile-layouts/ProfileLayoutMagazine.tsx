'use client';

import { ProfileCard } from '@/components/ProfileCard';
import { Tabs } from '@/components/Tabs';
import type { Post, Work, Profile, Stats } from '@/lib/types';

/**
 * B 杂志编辑风（默认）。
 * 经典双栏：左侧固定侧栏 ProfileCard + 右侧 Tabs 内容区。
 * 衬线字体、暖色调、编辑感大标题。
 */
export function ProfileLayoutMagazine({
  profile,
  posts,
  works,
  stats,
}: {
  profile: Profile;
  posts: Post[];
  works: Work[];
  stats: Stats | null;
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-10 md:grid md:grid-cols-[320px_1fr] md:gap-8">
      <aside className="md:sticky md:top-4 md:self-start">
        <ProfileCard profile={profile} stats={stats} postCount={posts.length} />
      </aside>
      <div>
        <Tabs posts={posts} works={works} profile={profile} />
      </div>
    </div>
  );
}
