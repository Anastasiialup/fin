'use client';

import { useEffect, useState } from 'react';
import { Profile as ProfileType } from 'basics/types/profile.type';
import Profile from 'components/Profile';
import { fetchProfile } from 'lib/api/profile';

const ProfilePage = () => {
  const [profile, setProfile] = useState<ProfileType | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const userId = 1; // замінити на реальний спосіб отримання ID

  useEffect(() => {
    fetchProfile(userId).then(setProfile).catch(console.error);
  }, [refreshTrigger]);

  return (
    <div className="max-w-3xl mx-auto p-4">
      {
        profile && (
          <Profile profile={ profile } onProfileUpdated={ () => setRefreshTrigger((prev) => prev + 1) } />
        )
      }
    </div>
  );
};

export default ProfilePage;
