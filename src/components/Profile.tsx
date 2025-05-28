// components/Profile.tsx

'use client';

import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { FC } from 'react';
import EditProfileClientWrapper from './EditProfile/EditProfileClientWrapper';
import { Profile } from 'basics/types/profile.type';

type Props = {
  profile: Profile;
  onProfileUpdated: () => void;
};

const ProfileComponent: FC<Props> = ({ profile, onProfileUpdated }) => {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/login');
  };

  const profileImageUrl = profile.profileImage || `${process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT}/default.png`;

  return (
    <div className="space-y-4">
      <img
        src={ profileImageUrl }
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover"
      />
      <p><strong>Імʼя:</strong> { profile.username }</p>
      <p><strong>Email:</strong> { profile.email }</p>
      <p><strong>Дата створення:</strong> { new Date(profile.createdAt).toLocaleDateString() }</p>

      <EditProfileClientWrapper profile={ profile } onSuccess={ onProfileUpdated } />

      <button
        onClick={ handleSignOut }
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
                Вийти з профілю
      </button>
    </div>
  );
};

export default ProfileComponent;
