import { useAuth } from '../auth.jsx';
import { useLanguage } from '../i18n.jsx';
import InViewSection from '../components/common/InViewSection.jsx';
import './pages.css';


export default function Profile() {
  const { user, userProfile } = useAuth();
  const { strings } = useLanguage();
  const profile = strings.profile;

  const displayName = userProfile?.displayName || user?.displayName || profile.fallbackUser;
  const email = userProfile?.email || user?.email || '';
  const photoURL = userProfile?.photoURL || user?.photoURL || '';
  const isGoogle = userProfile?.providerId === 'google.com';

  return (
    <div className="page-shell route-screen">
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{profile.title}</h1>
            <p>{profile.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="page-wrap" style={{ paddingBottom: 48 }}>
        <InViewSection>
          <div className="profile-layout">
            <div className="profile-card">
              <div className="profile-avatar-wrap">
                {photoURL ? (
                  <img className="profile-avatar-img" src={photoURL} alt={displayName} referrerPolicy="no-referrer" />
                ) : (
                  <div className="profile-avatar">🐱</div>
                )}
                <div className="profile-online-dot" title={profile.online} />
              </div>

              <h2 className="profile-name">{displayName}</h2>
              <p className="profile-handle">{email ? `@${email.split('@')[0]}` : '@catuser'}</p>

              <div className={`profile-provider-badge${isGoogle ? '' : ' email'}`}>
                {isGoogle ? profile.providerGoogle : profile.providerEmail}
              </div>

              <div className="profile-stats">
                <div className="profile-stat"><strong>4,720</strong><span>{profile.stats.points}</span></div>
                <div className="profile-stat"><strong>23</strong><span>{profile.stats.rooms}</span></div>
                <div className="profile-stat"><strong>7</strong><span>{profile.stats.badges}</span></div>
              </div>

              <button className="profile-edit-btn">{profile.editProfile}</button>
            </div>

            <div>
              <InViewSection delay={80}>
                <div className="profile-badges-section">
                  <h3>{profile.badgesTitle}</h3>
                  <div className="badges-grid">
                    {profile.badges.map((b) => (
                      <span key={b} className="badge-chip">{b}</span>
                    ))}
                  </div>
                </div>
              </InViewSection>

              <InViewSection delay={140}>
                <div className="profile-activity-section">
                  <h3>{profile.activityTitle}</h3>
                  <div className="activity-list">
                    {profile.activity.map((a) => (
                      <div key={a.text} className="activity-row">
                        <div className="activity-icon">{a.icon}</div>
                        <span className="activity-text">{a.text}</span>
                        <span className="activity-time">{a.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </InViewSection>
            </div>
          </div>
        </InViewSection>
      </div>
    </div>
  );
}
