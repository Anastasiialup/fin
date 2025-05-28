import { FC, useState } from 'react';

type AuthFormPropsType = {
  submitCallback: (data: { email: string; password: string }) => Promise<void>;
  cancelCallback: () => void;
  onGoogleSignIn: () => Promise<void>;
  onGitHubSignIn: () => Promise<void>;
};

const AuthForm: FC<AuthFormPropsType> = ({
  submitCallback,
  cancelCallback,
  onGoogleSignIn,
  onGitHubSignIn,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    await submitCallback({ email, password });
    setIsSubmitting(false);
  };

  return (
    <form
      onSubmit={
        (e) => {
          e.preventDefault();
          handleSubmit();
        }
      }
      className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
    >
      <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
        </label>
        <input
          type="text"
          id="email"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
        </label>
        <input
          type="password"
          id="password"
          className="mt-1 w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
      </div>

      <div className="flex justify-between mb-6">
        <button
          type="button"
          onClick={ cancelCallback }
          className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
        >
            Cancel
        </button>
        <button
          type="submit"
          disabled={ !isValid || isSubmitting }
          className={
            `px-4 py-2 text-white rounded-md ${
              isValid && !isSubmitting ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'
            }`
          }
        >
          { isSubmitting ? 'Verifying...' : 'Verify' }
        </button>
      </div>

      <div className="flex flex-col gap-4">
        <button
          type="button"
          onClick={ onGoogleSignIn }
          className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
        >
            Sign in with Google
        </button>
        <button
          type="button"
          onClick={ onGitHubSignIn }
          className="w-full px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900"
        >
            Sign in with GitHub
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
