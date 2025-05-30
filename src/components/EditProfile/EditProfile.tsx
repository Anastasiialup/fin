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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async () => {
    setError(null);
    try {
      let profileImageUrl = profile.profileImage;

      if (imageFile) {
        const formData = new FormData();
        formData.append('file', imageFile);

        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!res.ok) {
          throw new Error('Помилка завантаження зображення');
        }

        const data = await res.json();
        profileImageUrl = data.url;
      }

      await updateProfile({ id: profile.id, username, password, profileImage: profileImageUrl });
      onSuccess();
    } catch (e) {
      setError('Помилка оновлення профілю');
    }
  };

  return (
    <div className="space-y-2">
      <input
        className="custom-input"
        value={ username }
        onChange={ (e) => setUsername(e.target.value) }
        placeholder="Імʼя"
      />
      <input
        className="custom-input"
        type="password"
        value={ password }
        onChange={ (e) => setPassword(e.target.value) }
        placeholder="Новий пароль"
      />
      <input type="file" accept="image/*" onChange={ handleImageChange } />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={ handleSubmit }
      >
                Зберегти зміни
      </button>
      { error && <p className="text-red-600 mt-2">{ error }</p> }
    </div>
  );
};

export default EditProfile;
