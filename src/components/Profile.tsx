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
    <div className="profile-wrapper">
      <div className="profile-container">
        <img
          src={ profileImageUrl }
          alt="Profile"
          className="profile-image"
        />
        <div className="profile-info">
          <p><strong>Імʼя:</strong> { profile.username }</p>
          <p><strong>Email:</strong> { profile.email }</p>
          <p><strong>Дата створення:</strong> { new Date(profile.createdAt).toLocaleDateString() }</p>
        </div>

        <EditProfileClientWrapper profile={ profile } onSuccess={ onProfileUpdated } />

        <button
          onClick={ handleSignOut }
          className="btn-signout"
        >
            Вийти з профілю
        </button>
      </div>
    </div>
  );
};

export default ProfileComponent;
