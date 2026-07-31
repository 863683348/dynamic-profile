'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { ProfileForm, type ProfileFormData } from '@/components/ProfileForm';
import type { Profile } from '@/lib/types';

export default function ProfilePage() {
  const { status } = useSession();
  const { t } = useI18n();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status !== 'authenticated') return;
    fetch('/api/me')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => setProfile(j?.profile ?? null))
      .catch(() => {});
  }, [status]);

  async function handleSave(data: ProfileFormData) {
    setSaving(true);
    setError(null);
    setMsg(null);
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.message ?? t('d_err_save'));
      setProfile(json.profile as Profile);
      setMsg(t('d_msg_saved'));
    } catch (e) {
      setError(e instanceof Error ? e.message : t('d_err_save'));
    } finally {
      setSaving(false);
    }
  }

  if (status === 'loading') {
    return (
      <div className="flex justify-center py-20">
        <Loader2 className="h-6 w-6 animate-spin opacity-60" />
      </div>
    );
  }

  return (
    <div>
      <div className="double-rule mb-6 flex items-center justify-between px-1 py-3">
        <span className="text-xs uppercase tracking-[0.2em] opacity-70">
          {t('nav_profile')}
        </span>
      </div>

      {msg && <p className="mb-4 text-sm text-primary">{msg}</p>}
      {error && <p className="mb-4 text-sm text-primary">{error}</p>}

      <section className="paper-card p-6">
        <p className="mb-4 text-sm opacity-70">
          {profile ? t('d_profile_edit') : t('d_profile_create')}
        </p>
        <ProfileForm
          initial={profile}
          saving={saving}
          onSubmit={handleSave}
        />
      </section>
    </div>
  );
}
