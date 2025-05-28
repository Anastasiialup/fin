'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { Profile as ProfileType } from 'basics/types/profile.type';
import Profile from 'components/Profile';
import { fetchProfile } from 'lib/api/profile';

const ProfilePage = () => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const userId = session?.user?.id as number | undefined;

  useEffect(() => {
    if (!userId) return; // якщо немає id — не виконуємо запит

    fetchProfile(userId)
      .then(setProfile)
      .catch(() => {
        setError('Помилка завантаження профілю');
      });
  }, [userId, refreshTrigger]);

  if (status === 'loading') return <p>Завантаження...</p>;
  if (!userId) return <p>Користувач не авторизований</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      { error && <p className="text-red-600 mb-4">{ error }</p> }
      {
        profile && (
          <Profile profile={ profile } onProfileUpdated={ () => setRefreshTrigger((prev) => prev + 1) } />
        )
      }
    </div>
  );
};

export default ProfilePage;
