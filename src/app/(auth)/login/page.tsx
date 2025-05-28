'use client';

import { signOut } from 'next-auth/react';
import useLogin from './login.hook';
import AuthForm from 'components/AuthForm/AuthForm';

const Page = () => {
  const { handleCancelAuthForm, handleLoginAuthForm } = useLogin();

  return (
    <div className="flex justify-center items-center">
      <AuthForm
        submitCallback={ handleLoginAuthForm }
        cancelCallback={ handleCancelAuthForm }
      />

      <button onClick={ () => signOut() }>Sign out</button>
    </div>
  );
};

export default Page;
