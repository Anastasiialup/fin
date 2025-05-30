'use client';

import { signOut } from 'next-auth/react';
import useLogin from './login.hook';
import AuthForm from 'components/AuthForm/AuthForm';

const Page = () => {
  const {
    handleCancelAuthForm,
    handleLoginAuthForm,
    handleVerifyWithGoogle,
    handleVerifyWithGitHub,
  } = useLogin();

  return (
    <div className="flex justify-center items-center">
      <AuthForm
        submitCallback={ handleLoginAuthForm }
        cancelCallback={ handleCancelAuthForm }
        onGoogleSignIn={ handleVerifyWithGoogle }
        onGitHubSignIn={ handleVerifyWithGitHub }
        onSignOut={ () => signOut() } // ✅ додаємо
      />
    </div>
  );
};

export default Page;
