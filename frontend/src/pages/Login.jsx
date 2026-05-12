import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, error, clearError, isFirebaseConfigured, user, loading, resetPassword } = useAuth();
  const { strings } = useLanguage();
  const auth = strings.auth;
  const fromPath = location.state?.from?.pathname;

  // Compute the post-login destination: prefer the guarded page they came from,
  // otherwise land on their MeowDex profile (resolved once user is known).
  const getDestination = (loggedInUser) =>
    fromPath && fromPath !== '/login' ? fromPath : `/meowdex/${loggedInUser.uid}`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localMessage, setLocalMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    clearError();
  }, [clearError]);

  useEffect(() => {
    if (user) {
      navigate(getDestination(user), { replace: true });
    }
  }, [user, navigate, fromPath]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLocalMessage('');
    setIsSubmitting(true);

    try {
      const loggedInUser = await login(email, password);
      navigate(getDestination(loggedInUser), { replace: true });
    } catch (err) {
      setLocalMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLocalMessage('');
    setIsSubmitting(true);
    try {
      const loggedInUser = await loginWithGoogle();
      navigate(getDestination(loggedInUser), { replace: true });
    } catch (err) {
      setLocalMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetPassword = async () => {
    if (!email) {
      setLocalMessage(auth.resetEnterEmail);
      return;
    }

    try {
      await resetPassword(email);
      setLocalMessage(auth.resetSent);
    } catch (err) {
      setLocalMessage(err.message);
    }
  };

  return (
    <div className="page-shell auth-page">
      <section className="page-wrap auth-grid">
        <aside className="auth-illustration-card">
          <div className="auth-illustration-badge">🐱🔐</div>
          <h1>{auth.loginTitle}</h1>
          <p>{auth.loginSubtitle}</p>
          <div className="auth-illustration-note">
            <span>🐾</span>
            <div>
              <strong>{auth.firebaseAuthLabel}</strong>
              <p>{isFirebaseConfigured ? auth.firebaseReady : auth.firebaseMissing}</p>
            </div>
          </div>
        </aside>

        <section className="auth-card">
          <div className="auth-card-header">
            <div className="pill">{strings.nav.login}</div>
            <h2>{auth.loginTitle}</h2>
            <p>{auth.loginSubtitle}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <button
              className="btn btn-secondary auth-submit"
              type="button"
              onClick={handleGoogleLogin}
              disabled={isSubmitting || loading || !isFirebaseConfigured}
            >
              {auth.googleButton}
            </button>

            <div className="auth-divider" role="separator" aria-label={auth.dividerAria}>
              <span>{auth.orContinueWithEmail}</span>
            </div>

            <label className="auth-field">
              <span>{auth.email}</span>
              <input
                className="auth-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={auth.emailPlaceholder}
                autoComplete="email"
                required
              />
            </label>

            <label className="auth-field">
              <span>{auth.password}</span>
              <input
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={auth.passwordPlaceholder}
                autoComplete="current-password"
                required
              />
            </label>

            {(error || localMessage) && <div className="auth-message">{error || localMessage}</div>}
            {!isFirebaseConfigured && <div className="auth-message auth-message-warn">{auth.firebaseMissing}</div>}

            <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting || loading}>
              {isSubmitting ? '...' : auth.loginButton}
            </button>

            <button type="button" className="auth-link" onClick={handleResetPassword}>
              {auth.resetPassword}
            </button>
          </form>

          <div className="auth-footer">
            <span>{auth.switchToRegister}</span>
            <Link to="/register" className="auth-link-inline">
              {strings.nav.register}
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
