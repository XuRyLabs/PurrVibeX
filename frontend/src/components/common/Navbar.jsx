import { useEffect, useRef, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../../i18n.jsx';
import { useAuth } from '../../auth.jsx';
import { useDarkMode } from '../../hooks/useDarkMode.js';

export default function Navbar() {
  const { lang, strings, toggleLang } = useLanguage();
  const { user, userProfile, logout } = useAuth();
  const [dark, toggleDark] = useDarkMode();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const settingsRef = useRef(null);

  const nav = strings.nav;

  const links = [
    ...(!user ? [{ to: '/about', label: nav.about, icon: '✨' }] : []),
    ...(user
      ? [
          { to: '/purrlounge',  label: nav.rooms,       icon: '🐾' },
          { to: '/mewseum',     label: nav.gallery,     icon: '🖼️' },
          { to: '/toppaw',      label: nav.leaderboard, icon: '🏆' },
          { to: '/clawmart',    label: nav.shop,        icon: '🛍️' },
        ]
      : []),
  ];

  const handleLogout = async () => {
    setMenuOpen(false);
    await logout();
    navigate('/');
  };

  /* close dropdown on outside click */
  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [menuOpen]);

  /* close settings dropdown on outside click */
  useEffect(() => {
    if (!settingsOpen) return;
    const handler = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) {
        setSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [settingsOpen]);

  const displayName =
    userProfile?.displayName || user?.displayName || user?.email?.split('@')[0] || 'Cat User';

  return (
    <>
      <header className="navbar">
        <div className="navbar-inner">
        {/* Brand — goes to MeowDex when logged in, home when guest */}
        <Link to={user ? `/meowdex/${user.uid}` : '/'} className="brand" aria-label="PurrVibeX home">
            <span className="brand-mark">🐾</span>
            <span>
              PurrVibeX
              <div className="brand-subtitle">{nav.brandSubtitle}</div>
            </span>
          </Link>

          <div className="nav-tools">
            {/* Main nav links (desktop) */}
            <nav className="nav-links" aria-label="Main navigation">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                  end={link.to === '/'}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="nav-auth-controls">
              {user ? (
                /* ── User menu ── */
                <div className="user-menu-wrap" ref={menuRef}>
                  <button
                    type="button"
                    className="user-chip user-chip-btn"
                    aria-haspopup="true"
                    aria-expanded={menuOpen}
                    onClick={() => setMenuOpen(o => !o)}
                  >
                    {userProfile?.photoURL ? (
                      <img
                        src={userProfile.photoURL}
                        alt={displayName}
                        className="user-chip-avatar"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <span className="user-chip-emoji">🐱</span>
                    )}
                    {displayName}
                    <span className="user-chip-caret" aria-hidden="true">
                      {menuOpen ? '▲' : '▼'}
                    </span>
                  </button>

                  {menuOpen && (
                    <div className="user-dropdown" role="menu">
                    <Link
                      to={`/meowdex/${user.uid}`}
                      className="user-dropdown-item"
                        role="menuitem"
                        onClick={() => setMenuOpen(false)}
                      >
                        <span className="udd-icon">🐾</span>
                        {nav.profile}
                      </Link>

                      <div className="user-dropdown-sep" />

                      <button
                        type="button"
                        className="user-dropdown-item"
                        role="menuitem"
                        onClick={() => { toggleLang(); setMenuOpen(false); }}
                      >
                        <span className="udd-icon">🌐</span>
                        {nav.switchTo}
                      </button>

                      <button
                        type="button"
                        className="user-dropdown-item"
                        role="menuitem"
                        onClick={() => { toggleDark(); setMenuOpen(false); }}
                      >
                        <span className="udd-icon">{dark ? '☀️' : '🌙'}</span>
                        {dark ? nav.lightMode : nav.darkMode}
                      </button>

                      <div className="user-dropdown-sep" />

                      <button
                        type="button"
                        className="user-dropdown-item user-dropdown-item-danger"
                        role="menuitem"
                        onClick={handleLogout}
                      >
                        <span className="udd-icon">🚪</span>
                        {nav.logout}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <div className="user-menu-wrap" ref={settingsRef}>
                    <button
                      type="button"
                      className="nav-link settings-btn"
                      aria-haspopup="true"
                      aria-expanded={settingsOpen}
                      onClick={() => setSettingsOpen(o => !o)}
                    >
                      <span aria-hidden="true">⚙️</span>
                      {nav.settings}
                    </button>

                    {settingsOpen && (
                      <div className="user-dropdown" role="menu">
                        <button
                          type="button"
                          className="user-dropdown-item"
                          role="menuitem"
                          onClick={() => { toggleLang(); setSettingsOpen(false); }}
                        >
                          <span className="udd-icon">🌐</span>
                          {nav.switchTo}
                        </button>

                        <button
                          type="button"
                          className="user-dropdown-item"
                          role="menuitem"
                          onClick={() => { toggleDark(); setSettingsOpen(false); }}
                        >
                          <span className="udd-icon">{dark ? '☀️' : '🌙'}</span>
                          {dark ? nav.lightMode : nav.darkMode}
                        </button>
                      </div>
                    )}
                  </div>

                  <Link className="auth-btn auth-btn-secondary" to="/login">
                    {nav.login}
                  </Link>
                  <Link className="auth-btn auth-btn-primary" to="/register">
                    {nav.register}
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* ── Bottom dock (mobile / tablet) — outside <header> to escape backdrop-filter containing block ── */}
      <nav className="dock-nav" aria-label="Dock navigation">
        {links.map((link) => (
          <NavLink
            key={`dock-${link.to}`}
            to={link.to}
            className={({ isActive }) => `dock-link ${isActive ? 'active' : ''}`}
            end={link.to === '/'}
          >
            <span className="dock-icon" aria-hidden="true">{link.icon}</span>
            <span className="dock-label">{link.label}</span>
          </NavLink>
        ))}

        {/* Guest: Login + Settings toggles */}
        {!user && (
          <>
            <NavLink
              to="/login"
              className={({ isActive }) => `dock-link ${isActive ? 'active' : ''}`}
            >
              <span className="dock-icon" aria-hidden="true">🔑</span>
              <span className="dock-label">{nav.login}</span>
            </NavLink>
            <button
              type="button"
              className="dock-link"
              onClick={toggleLang}
              aria-label={nav.switchTo}
            >
              <span className="dock-icon">🌐</span>
              <span className="dock-label">{lang === 'en' ? 'VI' : 'EN'}</span>
            </button>
          </>
        )}

        {/* Dark / light toggle — always visible */}
        <button
          type="button"
          className="dock-link"
          onClick={toggleDark}
          aria-label={dark ? nav.lightMode : nav.darkMode}
        >
          <span className="dock-icon">{dark ? '☀️' : '🌙'}</span>
          <span className="dock-label">{dark ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    </>
  );
}
