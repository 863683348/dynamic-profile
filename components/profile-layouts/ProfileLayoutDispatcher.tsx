'use client';

import type { Post, Work, Profile, Stats } from '@/lib/types';
import { StyleId } from '@/lib/styles';
import { ProfileLayoutMagazine } from './ProfileLayoutMagazine';
import { ProfileLayoutMinimal } from './ProfileLayoutMinimal';
import { ProfileLayoutGeek } from './ProfileLayoutGeek';
import { ProfileLayoutGlass } from './ProfileLayoutGlass';
import { ProfileLayoutNeon } from './ProfileLayoutNeon';

/**
 * 按风格分发不同的页面排版。
 * 每种风格不仅颜色/字体不同，布局结构（侧栏/单列/终端/浮动/发光）也不同。
 */
export function ProfileLayoutDispatcher({
  style,
  profile,
  posts,
  works,
  stats,
}: {
  style: StyleId;
  profile: Profile;
  posts: Post[];
  works: Work[];
  stats: Stats | null;
}) {
  switch (style) {
    case 'minimal':
      return (
        <ProfileLayoutMinimal
          profile={profile}
          posts={posts}
          works={works}
          stats={stats}
        />
      );
    case 'geek':
      return (
        <ProfileLayoutGeek
          profile={profile}
          posts={posts}
          works={works}
          stats={stats}
        />
      );
    case 'glass':
      return (
        <ProfileLayoutGlass
          profile={profile}
          posts={posts}
          works={works}
          stats={stats}
        />
      );
    case 'neon':
      return (
        <ProfileLayoutNeon
          profile={profile}
          posts={posts}
          works={works}
          stats={stats}
        />
      );
    case 'magazine':
    default:
      return (
        <ProfileLayoutMagazine
          profile={profile}
          posts={posts}
          works={works}
          stats={stats}
        />
      );
  }
}
