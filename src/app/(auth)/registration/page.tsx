'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { signUp } from 'basics/actions/auth';
import { successToast, warningToast } from 'basics/utils/toast';

export default function RegisterPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: '',
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleVerifyAuthForm = async (userData: typeof form) => {
    const result = await signUp(userData);

    if (result.success) {
      const event = new Event('visibilitychange');
      document.dispatchEvent(event);

      successToast('You have successfully signed in');
      router.push('/');
    } else {
      warningToast(result.error || 'Some error occurred');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleVerifyAuthForm(form);
    } catch (err) {
      warningToast('Сталася помилка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form-wrapper">
      <h2>Реєстрація</h2>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          required
          value={ form.username }
          onChange={ handleChange }
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          required
          value={ form.email }
          onChange={ handleChange }
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          required
          value={ form.password }
          onChange={ handleChange }
        />

        <label htmlFor="profileImage">Profile Image</label>
        <input
          id="profileImage"
          name="profileImage"
          type="text"
          required
          value={ form.profileImage }
          onChange={ handleChange }
        />

        <div className="register-form-buttons">
          <button
            type="submit"
            disabled={ loading }
            className="register-btn-submit"
          >
            { loading ? 'Реєстрація...' : 'Зареєструватися' }
          </button>
        </div>

      </form>
    </div>
  );
}
