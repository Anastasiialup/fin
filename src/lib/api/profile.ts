import { Profile } from 'basics/types/profile.type';

export async function fetchProfile(id: number): Promise<Profile> {
  const res = await fetch(`/api/profile/${id}`);
  if (!res.ok) throw new Error('Помилка отримання профілю');
  return res.json();
}

// lib/api/profile.ts
export async function updateProfile(data: Partial<Profile>): Promise<Profile> {
  const res = await fetch('/api/profile', {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  });
  if (!res.ok) throw new Error('Помилка оновлення профілю');
  return res.json();
}
