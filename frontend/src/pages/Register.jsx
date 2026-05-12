import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { useLanguage } from '../i18n.jsx';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, loginWithGoogle, error, clearError, isFirebaseConfigured, user, loading } = useAuth();
  const { strings } = useLanguage();
  const auth = strings.auth;
  const fromPath = location.state?.from?.pathname;
  const getDestination = (loggedInUser) =>
    fromPath && fromPath !== '/register' ? fromPath : `/meowdex/${loggedInUser.uid}`;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
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
      const loggedInUser = await register(email, password, displayName);
      navigate(getDestination(loggedInUser), { replace: true });
    } catch (err) {
      setLocalMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleRegister = async () => {
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

  return (
    <div className="page-shell auth-page">
      <section className="page-wrap auth-grid auth-grid-reverse">
        <aside className="auth-illustration-card auth-illustration-card-accent">
          <div className="auth-illustration-badge">🐱🌸</div>
          <h1>{auth.registerTitle}</h1>
          <p>{auth.registerSubtitle}</p>
          <div className="auth-illustration-note">
            <span>🎀</span>
            <div>
              <strong>{auth.registerNoteTitle}</strong>
              <p>{auth.registerNoteText}</p>
            </div>
          </div>
        </aside>

        <section className="auth-card">
          <div className="auth-card-header">
            <div className="pill">{strings.nav.register}</div>
            <h2>{auth.registerTitle}</h2>
            <p>{auth.registerSubtitle}</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <button
              className="btn btn-secondary auth-submit"
              type="button"
              onClick={handleGoogleRegister}
              disabled={isSubmitting || loading || !isFirebaseConfigured}
            >
              {auth.googleButton}
            </button>

            <div className="auth-divider" role="separator" aria-label={auth.dividerAria}>
              <span>{auth.orContinueWithEmail}</span>
            </div>

            <label className="auth-field">
              <span>{auth.displayName}</span>
              <input
                className="auth-input"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder={auth.displayNamePlaceholder}
                autoComplete="nickname"
              />
            </label>

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
                autoComplete="new-password"
                required
              />
            </label>

            {(error || localMessage) && <div className="auth-message">{error || localMessage}</div>}
            {!isFirebaseConfigured && <div className="auth-message auth-message-warn">{auth.firebaseMissing}</div>}

            <button className="btn btn-primary auth-submit" type="submit" disabled={isSubmitting || loading}>
              {isSubmitting ? '...' : auth.registerButton}
            </button>
          </form>

          <div className="auth-footer">
            <span>{auth.switchToLogin}</span>
            <Link to="/login" className="auth-link-inline">
              {strings.nav.login}
            </Link>
          </div>
        </section>
      </section>
    </div>
  );
}
