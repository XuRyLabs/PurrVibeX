import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { useLanguage } from '../i18n';
import InViewSection from '../components/common/InViewSection.jsx';
import CountryBadge from '../components/common/CountryBadge.jsx';
import { userService } from '../services/userService.js';
import { authService } from '../services/authService.js';
import './pages.css';

function localizeZodiac(sign, profile) {
  const key = String(sign || '').toLowerCase();
  const map = {
    aries: profile.zodiacAries,
    taurus: profile.zodiacTaurus,
    gemini: profile.zodiacGemini,
    cancer: profile.zodiacCancer,
    leo: profile.zodiacLeo,
    virgo: profile.zodiacVirgo,
    libra: profile.zodiacLibra,
    scorpio: profile.zodiacScorpio,
    sagittarius: profile.zodiacSagittarius,
    capricorn: profile.zodiacCapricorn,
    aquarius: profile.zodiacAquarius,
    pisces: profile.zodiacPisces,
    unknown: profile.zodiacUnknown,
  };
  return map[key] || sign || profile.zodiacUnknown;
}

export default function Profile() {
  const navigate = useNavigate();
  const { username } = useParams();
  const { user, userProfile } = useAuth();
  const { strings } = useLanguage();
  const profile = strings.profile;

  const [backendProfile, setBackendProfile] = useState(null);
  const [loadingBackend, setLoadingBackend] = useState(true);

  useEffect(() => {
    let alive = true;

    const ensureBackendToken = async () => {
      const existing = localStorage.getItem('token');
      if (existing) return existing;
      if (!user?.email) return null;

      const { data } = await authService.firebaseLogin({
        email: user.email,
        display_name: user.displayName || user.email.split('@')[0],
        avatar_url: user.photoURL || null,
      });
      if (data?.token) {
        localStorage.setItem('token', data.token);
        return data.token;
      }
      return null;
    };

    (async () => {
      try {
        await ensureBackendToken();
        const slug = username || userProfile?.username || user?.email?.split('@')[0] || 'me';
        let data;
        try {
          const res = await userService.getByUsername(slug);
          data = res.data;
        } catch {
          // Fallback for edge cases while route/data is converging.
          const res = await userService.getMe();
          data = res.data;
        }
        if (alive) setBackendProfile(data || null);
      } catch {
        if (alive) setBackendProfile(null);
      } finally {
        if (alive) setLoadingBackend(false);
      }
    })();

    return () => { alive = false; };
  }, [user, userProfile?.username, username]);

  const merged = useMemo(() => ({
    displayName: backendProfile?.display_name || userProfile?.displayName || user?.displayName || profile.fallbackUser,
    username: backendProfile?.username || (userProfile?.email ? userProfile.email.split('@')[0] : ''),
    email: backendProfile?.email || userProfile?.email || user?.email || '',
    phone: backendProfile?.phone || '',
    avatar: backendProfile?.avatar_url || userProfile?.photoURL || user?.photoURL || '',
    bio: backendProfile?.bio || '',
    location: backendProfile?.location || [backendProfile?.ward, backendProfile?.city, backendProfile?.country].filter(Boolean).join(', '),
    country: backendProfile?.country || '',
    timezone: backendProfile?.timezone || '',
    visibility: backendProfile?.profile_visibility || 'public',
    purrPoints: Number(backendProfile?.purr_points ?? 0),
    postCount: Number(backendProfile?.post_count ?? 0),
    friendCount: Number(backendProfile?.friend_count ?? 0),
    zodiacSign: backendProfile?.zodiac_sign || 'Unknown',
    zodiacIcon: backendProfile?.zodiac_icon || '✨',
  }), [backendProfile, userProfile, user, profile.fallbackUser]);

  const isEmojiAvatar = merged.avatar && !String(merged.avatar).startsWith('http');
  const modeIcon =
    merged.visibility === 'friends' ? '🐾' :
    merged.visibility === 'private' ? '🔒' : '🌍';
  const zodiacLabel = localizeZodiac(merged.zodiacSign, profile);
  const modeTitle =
    merged.visibility === 'friends' ? profile.visibilityFriendsLabel :
    merged.visibility === 'private' ? profile.visibilityPrivateLabel : profile.visibilityPublicLabel;

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
                {isEmojiAvatar ? (
                  <div className="profile-avatar">{merged.avatar}</div>
                ) : merged.avatar ? (
                  <img className="profile-avatar-img" src={merged.avatar} alt={merged.displayName} referrerPolicy="no-referrer" />
                ) : (
                  <div className="profile-avatar">🐱</div>
                )}
                <div className="profile-online-dot" title={profile.online} />
              </div>

              <h2 className="profile-name">{merged.displayName}</h2>
              <div className="profile-handle-row">
                <p className="profile-handle">{merged.username ? `@${merged.username}` : '@catuser'}</p>
                <span className="profile-mode-badge" title={modeTitle} aria-label={modeTitle}>{loadingBackend ? '…' : modeIcon}</span>
              </div>

              <div className="profile-badge-row">
                <CountryBadge country={merged.country} />
                <div className="profile-zodiac-badge" title={merged.zodiacSign}>
                  <span className="profile-zodiac-icon" aria-hidden="true">{merged.zodiacIcon}</span>
                  <span>{zodiacLabel}</span>
                </div>
              </div>

              <div className="profile-stats">
                <div className="profile-stat">
                  <strong>{loadingBackend ? '…' : merged.purrPoints.toLocaleString()}</strong>
                  <span>{profile.purrPointLabel}</span>
                </div>
                <div className="profile-stat">
                  <strong>{loadingBackend ? '…' : merged.postCount.toLocaleString()}</strong>
                  <span>{profile.postsLabel}</span>
                </div>
                <div className="profile-stat">
                  <strong>{loadingBackend ? '…' : merged.friendCount}</strong>
                  <span>{profile.friendLabel}</span>
                </div>
              </div>

              <button className="profile-edit-btn" onClick={() => navigate('/purrdex/edit')}>{profile.editProfile}</button>
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
                    {merged.bio && (
                      <div className="activity-row">
                        <div className="activity-icon">📝</div>
                        <span className="activity-text">{merged.bio}</span>
                        <span className="activity-time">{profile.bioLabel}</span>
                      </div>
                    )}
                    {merged.location && (
                      <div className="activity-row">
                        <div className="activity-icon">📍</div>
                        <span className="activity-text">{merged.location}</span>
                        <span className="activity-time">{profile.locationLabel}</span>
                      </div>
                    )}
                    {merged.timezone && (
                      <div className="activity-row">
                        <div className="activity-icon">🌏</div>
                        <span className="activity-text">{merged.timezone}</span>
                        <span className="activity-time">{profile.timezoneLabel}</span>
                      </div>
                    )}
                    {!merged.bio && !merged.location && !merged.timezone && profile.activity.map((a) => (
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
