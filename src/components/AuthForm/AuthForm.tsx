import { FC, useState } from 'react';

type AuthFormPropsType = {
  submitCallback: (data: { email: string; password: string }) => Promise<void>;
  cancelCallback: () => void;
  onGoogleSignIn: () => Promise<void>;
  onGitHubSignIn: () => Promise<void>;
  onSignOut?: () => Promise<void>;
};

const AuthForm: FC<AuthFormPropsType> = ({
  submitCallback,
  cancelCallback,
  onGoogleSignIn,
  onGitHubSignIn,
  onSignOut,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValid = email.trim() !== '' && password.trim() !== '';

  const handleSubmit = async () => {
    if (!isValid) return;
    setIsSubmitting(true);
    await submitCallback({
      email,
      password,
    });
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
      className="auth-form-wrapper"
    >
      <h2>Увійти в аккаунт</h2>

      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={ email }
          onChange={ (e) => setEmail(e.target.value) }
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={ password }
          onChange={ (e) => setPassword(e.target.value) }
          required
        />
      </div>
      <div className="auth-form-buttons flex gap-2 justify-end mt-4">
        <button
          type="button"
          onClick={ cancelCallback }
          className="btn-cancel"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={ !isValid || isSubmitting }
          className="btn-submit"
        >
          { isSubmitting ? 'Verifying...' : 'Verify' }
        </button>
        {
          onSignOut && (
            <button
              type="button"
              onClick={ onSignOut }
              className="btn-submit"
            >
              Sign Out
            </button>
          )
        }
      </div>

      <div className="auth-social-buttons">
        <button
          type="button"
          onClick={ onGoogleSignIn }
          className="google"
        >
                    Sign in with Google
        </button>
        <button
          type="button"
          onClick={ onGitHubSignIn }
          className="github"
        >
                    Sign in with GitHub
        </button>
      </div>
    </form>

  );
};

export default AuthForm;
