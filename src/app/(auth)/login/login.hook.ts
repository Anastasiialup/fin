'use client';

import { useRouter } from 'next/navigation';
import { signInWithCredentials, signInWithGoogle, signInWithGitHub } from 'basics/actions/auth';
import { successToast, warningToast } from 'basics/utils/toast';

const useLogin = () => {
  const router = useRouter();

  const handleCancelAuthForm = () => {
    router.push('/');
  };

  const handleLoginAuthForm = async (userData: { email: string; password: string }) => {
    const result = await signInWithCredentials(userData);
    if (result.success) {
      document.dispatchEvent(new Event('visibilitychange'));
      successToast('You have successfully signed in');
      router.push('/home');
    } else {
      warningToast('Login or password are not valid');
    }
  };

  const handleVerifyWithGoogle = async () => {
    const result = await signInWithGoogle();

    if (result.success) {
      document.dispatchEvent(new Event('visibilitychange'));
      successToast('You have successfully signed in with Google');
      router.push(result.redirectLink || '/');
    } else {
      warningToast('Error occurred during Google sign in');
    }
  };

  const handleVerifyWithGitHub = async () => {
    const result = await signInWithGitHub();
    if (result.success) {
      document.dispatchEvent(new Event('visibilitychange'));
      successToast('You have successfully signed in with GitHub');
      router.push(result.redirectLink || '/');
    } else {
      warningToast('Error occurred during GitHub sign in');
    }
  };

  return {
    handleCancelAuthForm,
    handleLoginAuthForm,
    handleVerifyWithGoogle,
    handleVerifyWithGitHub,
  };
};

export default useLogin;
