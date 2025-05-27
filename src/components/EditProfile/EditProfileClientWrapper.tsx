'use client';

import dynamic from 'next/dynamic';
import { Profile } from 'basics/types/profile.type';

const EditProfile = dynamic(() => import('./EditProfile'), { ssr: false });

const EditProfileClientWrapper = ({ profile, onSuccess }: { profile: Profile; onSuccess: () => void }) => {
  return <EditProfile profile={ profile } onSuccess={ onSuccess } />;
};

export default EditProfileClientWrapper;
