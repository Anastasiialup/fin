'use client';

import { FC, useState } from 'react';
import { Profile } from 'basics/types/profile.type';
import { updateProfile } from 'lib/api/profile';

type Props = {
  profile: Profile;
  onSuccess: () => void;
};

const EditProfile: FC<Props> = ({ profile, onSuccess }) => {
  const [username, setUsername] = useState(profile.username);
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await updateProfile({ id: profile.id, username, password });
      onSuccess();
    } catch (e) {
      alert('Помилка оновлення профілю');
    }
  };

  return (
    <div className="space-y-2">
      <input
        className="border px-2 py-1 w-full"
        value={ username }
        onChange={ (e) => setUsername(e.target.value) }
        placeholder="Імʼя"
      />
      <input
        className="border px-2 py-1 w-full"
        type="password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        placeholder="Новий пароль"
      />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={ handleSubmit }
      >
                Зберегти зміни
      </button>
    </div>
  );
};

export default EditProfile;
