import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth.jsx';
import { useLanguage } from '../i18n';
import { userService } from '../services/userService.js';
import { authService } from '../services/authService.js';
import { locationService } from '../services/locationService.js';
import { DatePicker } from '../components/common/DatePicker.jsx';
import { getCountryOptions, normalizeCountryCode } from '../constants/countries.js';
import './pages.css';

// ── Constants ────────────────────────────────────────────────────────────────
const CAT_EMOJIS = ['🐱', '😸', '🐾', '😺', '🙀', '😻', '🐈', '🐈‍⬛', '😼', '😽', '🐅', '🦁'];

const GENDERS = [
  { value: 'male',            label: 'genderMale' },
  { value: 'female',          label: 'genderFemale' },
  { value: 'prefer_not_to_say', label: 'genderPreferNot' },
];

const VISIBILITIES = [
  { value: 'public',  label: 'visibilityPublic' },
  { value: 'friends', label: 'visibilityFriends' },
  { value: 'private', label: 'visibilityPrivate' },
];

const LOCALES = [
  { value: 'en', label: 'English' },
  { value: 'vi', label: 'Tiếng Việt' },
  { value: 'ja', label: '日本語' },
  { value: 'ko', label: '한국어' },
  { value: 'zh', label: '中文' },
  { value: 'fr', label: 'Français' },
];

const TIMEZONE_FALLBACK = [
  'UTC',
  'Asia/Ho_Chi_Minh',
  'Asia/Bangkok',
  'Asia/Tokyo',
  'Asia/Seoul',
  'Asia/Singapore',
  'Europe/London',
  'Europe/Paris',
  'America/New_York',
  'America/Los_Angeles',
  'Australia/Sydney',
];

function normalizeUtcOffset(rawOffset) {
  if (!rawOffset) return 'UTC+00:00';

  const cleaned = rawOffset.replace(/^GMT/i, '').trim();
  if (!cleaned || cleaned === '0' || cleaned === '+0' || cleaned === '-0') {
    return 'UTC+00:00';
  }

  // Handles +7, -4, +07:00, -0430 formats.
  const match = cleaned.match(/^([+-])(\d{1,2})(?::?(\d{2}))?$/);
  if (!match) return `UTC${cleaned}`;

  const sign = match[1];
  const hours = String(match[2]).padStart(2, '0');
  const minutes = String(match[3] || '00').padStart(2, '0');
  return `UTC${sign}${hours}:${minutes}`;
}

function getUtcOffsetLabel(timeZone) {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      timeZoneName: 'shortOffset',
      hour: '2-digit',
      minute: '2-digit',
    });
    const parts = formatter.formatToParts(new Date());
    const tzNamePart = parts.find((part) => part.type === 'timeZoneName')?.value;
    return normalizeUtcOffset(tzNamePart);
  } catch {
    return 'UTC+00:00';
  }
}

function getUtcOffsetMinutes(offsetLabel) {
  const match = offsetLabel.match(/^UTC([+-])(\d{2}):(\d{2})$/);
  if (!match) return 0;

  const sign = match[1] === '-' ? -1 : 1;
  const hours = Number(match[2]);
  const minutes = Number(match[3]);

  return sign * (hours * 60 + minutes);
}

// ── Validation ───────────────────────────────────────────────────────────────
function validate(form, original, t) {
  const errors = {};

  if (form.username && form.username !== original.username) {
    if (!/^[a-zA-Z0-9_.]{3,30}$/.test(form.username)) {
      errors.username = t.errorUsernameFormat;
    }
  }

  if (form.email && form.email !== original.email) {
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t.errorEmailFormat;
    }
  }

  if (form.phone) {
    const cleaned = form.phone.replace(/\s/g, '');
    if (!/^[+]?[(]?[0-9]{3}[)]?[-.]?[0-9]{3}[-.]?[0-9]{4,6}$/.test(cleaned)) {
      errors.phone = t.errorPhoneFormat;
    }
  }

  if (form.bio && form.bio.length > 200) {
    errors.bio = `${form.bio.length}/200 — ${t.errorBioMax}`;
  }

  if (form.website_url && !/^https?:\/\/.+/.test(form.website_url)) {
    errors.website_url = t.errorWebsiteFormat;
  }

  if (form.date_of_birth) {
    const dob = new Date(form.date_of_birth);
    const today = new Date();
    if (dob >= today) {
      errors.date_of_birth = t.errorDobFuture;
    } else {
      const minAge = new Date(today.getFullYear() - 10, today.getMonth(), today.getDate());
      if (dob > minAge) errors.date_of_birth = t.errorDobMinAge;
    }
  }

  if (form.country && !form.city) {
    errors.city = t.citySelectPlaceholder || 'Please select a city.';
  }

  if (form.city && !form.ward) {
    errors.ward = t.wardSelectPlaceholder || 'Please select a ward.';
  }

  return errors;
}

// ── Username cooldown helper ─────────────────────────────────────────────────
function getUsernameCooldownDays(updatedAt) {
  if (!updatedAt) return 0;
  const diff = Math.floor((Date.now() - new Date(updatedAt).getTime()) / 86_400_000);
  return Math.max(0, 30 - diff);
}

// ── Field component ──────────────────────────────────────────────────────────
function Field({ label, hint, error, children }) {
  return (
    <div className={`ep-field${error ? ' ep-field--error' : ''}`}>
      <label className="ep-label">{label}{hint && <span className="ep-hint">{hint}</span>}</label>
      {children}
      {error && <p className="ep-error">{error}</p>}
    </div>
  );
}

// ── Section component ────────────────────────────────────────────────────────
function Section({ title, children }) {
  return (
    <div className="ep-section">
      <h3 className="ep-section-title">{title}</h3>
      <div className="ep-section-body">{children}</div>
    </div>
  );
}

// ── Warning banner ───────────────────────────────────────────────────────────
function WarnBanner({ message }) {
  return <div className="ep-warn-banner">⚠️ {message}</div>;
}

// ══════════════════════════════════════════════════════════════════════════════
export default function EditProfile() {
  const navigate = useNavigate();
  const { user, userProfile, patchUserProfile } = useAuth();
  const { strings, lang } = useLanguage();
  const t = strings.editProfile;
  const countryOptions = useMemo(() => getCountryOptions(lang), [lang]);
  const timezoneOptions = useMemo(() => {
    if (typeof Intl !== 'undefined' && typeof Intl.supportedValuesOf === 'function') {
      return Intl.supportedValuesOf('timeZone');
    }
    return TIMEZONE_FALLBACK;
  }, []);
  const timezoneSelectOptions = useMemo(() => {
    return timezoneOptions
      .map((tz) => {
        const offsetLabel = getUtcOffsetLabel(tz);
        return {
          value: tz,
          label: `(${offsetLabel}) ${tz}`,
          offset: getUtcOffsetMinutes(offsetLabel),
        };
      })
      .sort((a, b) => a.offset - b.offset || a.value.localeCompare(b.value));
  }, [timezoneOptions]);

  const [form, setForm] = useState({
    display_name: '',
    username: '',
    gender: '',
    date_of_birth: '',
    bio: '',
    email: '',
    phone: '',
    ward: '',
    city: '',
    country: '',
    website_url: '',
    social_twitter: '',
    social_instagram: '',
    timezone: '',
    locale: '',
    profile_visibility: 'public',
    avatar_url: '',
  });

  const [original, setOriginal] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');
  const [avatarOpen, setAvatarOpen] = useState(false);
  const formRef = useRef(null);
  const [cityOptions, setCityOptions] = useState([]);
  const [wardOptions, setWardOptions] = useState([]);
  const [cityCode, setCityCode] = useState('');
  const [wardCode, setWardCode] = useState('');
  const [loadingCities, setLoadingCities] = useState(false);
  const [loadingWards, setLoadingWards] = useState(false);

  // Ensure Sanctum token exists for protected profile APIs
  const ensureBackendToken = async () => {
    const existing = localStorage.getItem('token');
    if (existing) return existing;

    if (!user?.email) {
      throw new Error(t.errorAuthRequired || 'Please sign in again before saving your profile.');
    }

    const { data } = await authService.firebaseLogin({
      email: user.email,
      display_name: user.displayName || form.display_name || user.email.split('@')[0],
      avatar_url: user.photoURL || form.avatar_url || null,
    });

    if (data?.token) {
      localStorage.setItem('token', data.token);
      return data.token;
    }

    throw new Error(t.errorAuthRequired || 'Could not create backend session.');
  };

  // ── Load current profile ─────────────────────────────────────────────────
  useEffect(() => {
    ensureBackendToken()
      .then(() => userService.getMe())
      .then(({ data }) => {
        patchUserProfile(data);
        const prof = {
          display_name:     data.display_name || '',
          username:         data.username || '',
          gender:           data.gender || '',
          date_of_birth:    data.date_of_birth ? String(data.date_of_birth).substring(0, 10) : '',
          bio:              data.bio || '',
          email:            data.email || user?.email || '',
          phone:            data.phone || '',
          ward:             data.ward || '',
          city:             data.city || '',
          country:          normalizeCountryCode(data.country),
          website_url:      data.website_url || '',
          social_twitter:   data.social_twitter || '',
          social_instagram: data.social_instagram || '',
          timezone:         data.timezone || '',
          locale:           data.locale || '',
          profile_visibility: data.profile_visibility || 'public',
          avatar_url:       data.avatar_url || user?.photoURL || '',
          email_changed:    data.email_changed || false,
          username_updated_at: data.username_updated_at || null,
        };
        setForm(prof);
        setOriginal(prof);
      })
      .catch(() => {
        // Fallback to Firebase user data if backend is unavailable
        const prof = {
          display_name: user?.displayName || '',
          username: '',
          gender: '', date_of_birth: '', bio: '',
          email: user?.email || '',
          phone: '', ward: '', city: '', country: '',
          website_url: '', social_twitter: '', social_instagram: '',
          timezone: '', locale: '', profile_visibility: 'public',
          avatar_url: user?.photoURL || '',
          email_changed: false, username_updated_at: null,
        };
        setForm(prof);
        setOriginal(prof);
      })
      .finally(() => setLoading(false));
  }, [user]);

  // Country -> cities
  useEffect(() => {
    let active = true;

    if (!form.country) {
      setCityOptions([]);
      setWardOptions([]);
      setCityCode('');
      setWardCode('');
      return undefined;
    }

    setLoadingCities(true);
    locationService.getCities(form.country)
      .then(({ data }) => {
        if (!active) return;
        const list = Array.isArray(data?.cities) ? data.cities : [];
        setCityOptions(list);

        // Keep/restore selected city from loaded profile by city name.
        const matched = list.find((c) => c.name === form.city);
        if (matched) {
          setCityCode(String(matched.code));
        } else {
          setCityCode('');
          setWardCode('');
        }
      })
      .catch(() => {
        if (!active) return;
        setCityOptions([]);
      })
      .finally(() => {
        if (active) setLoadingCities(false);
      });

    return () => { active = false; };
  }, [form.country, form.city]);

  // City -> wards
  useEffect(() => {
    let active = true;

    if (!form.country || !cityCode) {
      setWardOptions([]);
      setWardCode('');
      return undefined;
    }

    setLoadingWards(true);
    locationService.getWards(form.country, cityCode)
      .then(({ data }) => {
        if (!active) return;
        const list = Array.isArray(data?.wards) ? data.wards : [];
        setWardOptions(list);

        const matched = list.find((w) => w.name === form.ward);
        setWardCode(matched ? String(matched.code) : '');
      })
      .catch(() => {
        if (!active) return;
        setWardOptions([]);
      })
      .finally(() => {
        if (active) setLoadingWards(false);
      });

    return () => { active = false; };
  }, [form.country, cityCode]);

  // ── Scroll to first error field ─────────────────────────────────────────
  const scrollToFirstError = (container = formRef.current) => {
    if (!container) return;
    // Wait one frame for React to flush error class into DOM
    requestAnimationFrame(() => {
      const target =
        container.querySelector('.ep-field--error') ||
        container.querySelector('.ep-server-error');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  };

  // ── Handlers ─────────────────────────────────────────────────────────────
  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const pickEmoji = (emoji) => {
    setForm((f) => ({ ...f, avatar_url: emoji }));
    setAvatarOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError('');
    setSuccess(false);

    const validationErrors = validate(form, original, t);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      scrollToFirstError();
      return;
    }

    setSaving(true);
    try {
      await ensureBackendToken();
      const { data } = await userService.updateProfile(form);
      patchUserProfile(data?.user || form);
      setSuccess(true);
      setOriginal(form);
      setTimeout(() => {
        const slug = form.username || userProfile?.username || user?.email?.split('@')[0] || 'me';
        navigate(`/purrdex/${slug}`);
      }, 1800);
    } catch (err) {
      const data = err.response?.data;
      if (data?.errors) {
        const mapped = {};
        Object.entries(data.errors).forEach(([k, msgs]) => {
          mapped[k] = Array.isArray(msgs) ? msgs[0] : msgs;
        });
        setErrors(mapped);
        scrollToFirstError();
      } else {
        setServerError(data?.message || err.message || t.errorGeneric);
        scrollToFirstError();
      }
    } finally {
      setSaving(false);
    }
  };

  // ── Cooldown / lock info ─────────────────────────────────────────────────
  const usernameCooldownDays = original ? getUsernameCooldownDays(original.username_updated_at) : 0;
  const emailLocked = original?.email_changed === true;
  const timezoneExists = !form.timezone || timezoneOptions.includes(form.timezone);

  // ── Avatar display ───────────────────────────────────────────────────────
  const isEmojiAvatar = form.avatar_url && !form.avatar_url.startsWith('http');

  if (loading) {
    return (
      <div className="page-shell route-screen">
        <div className="ep-loading">🐾</div>
      </div>
    );
  }

  return (
    <div className="page-shell route-screen">
      {/* Page header */}
      <div className="page-wrap page-header">
        <div className="page-header-inner">
          <div>
            <h1>{t.title}</h1>
            <p>{t.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="page-wrap ep-outer">
        <form ref={formRef} className="ep-form" onSubmit={handleSubmit} noValidate>

          {/* ── Avatar ─────────────────────────────────────────────────── */}
          <Section title={t.sectionAvatar}>
            <div className="ep-avatar-row">
              <div className="ep-avatar-preview">
                {isEmojiAvatar ? (
                  <span className="ep-avatar-emoji">{form.avatar_url || '🐱'}</span>
                ) : form.avatar_url ? (
                  <img src={form.avatar_url} alt="avatar" className="ep-avatar-img" referrerPolicy="no-referrer" />
                ) : (
                  <span className="ep-avatar-emoji">🐱</span>
                )}
              </div>
              <div className="ep-avatar-controls">
                <button type="button" className="ep-avatar-toggle" onClick={() => setAvatarOpen((o) => !o)}>
                  {t.avatarEdit}
                </button>
                {avatarOpen && (
                  <div className="ep-avatar-picker">
                    <label className="ep-label">{t.avatarUrl}</label>
                    <input
                      className="ep-input"
                      type="url"
                      placeholder="https://..."
                      value={form.avatar_url.startsWith('http') ? form.avatar_url : ''}
                      onChange={(e) => setForm((f) => ({ ...f, avatar_url: e.target.value }))}
                    />
                    <p className="ep-hint">{t.avatarOrPick}</p>
                    <div className="ep-emoji-grid">
                      {CAT_EMOJIS.map((em) => (
                        <button
                          key={em}
                          type="button"
                          className={`ep-emoji-btn${form.avatar_url === em ? ' active' : ''}`}
                          onClick={() => pickEmoji(em)}
                        >
                          {em}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Section>

          {/* ── Basic Info ──────────────────────────────────────────────── */}
          <Section title={t.sectionBasic}>
            <Field label={t.displayName} error={errors.display_name}>
              <input className="ep-input" type="text" maxLength={100} value={form.display_name} onChange={set('display_name')} placeholder="Mochi Cat" />
            </Field>

            <Field
              label={t.username}
              hint={usernameCooldownDays > 0 ? t.usernameCooldown.replace('{days}', usernameCooldownDays) : null}
              error={errors.username}
            >
              {usernameCooldownDays > 0 && <WarnBanner message={t.usernameWarning} />}
              <div className="ep-input-prefix">
                <span className="ep-prefix">@</span>
                <input
                  className="ep-input ep-input-with-prefix"
                  type="text"
                  maxLength={30}
                  value={form.username}
                  onChange={set('username')}
                  placeholder={t.labelPlaceholderUsername}
                  disabled={usernameCooldownDays > 0}
                />
              </div>
            </Field>

            <div className="ep-row-2">
              <Field label={t.gender} error={errors.gender}>
                <select className="ep-input ep-select" value={form.gender} onChange={set('gender')}>
                  {GENDERS.map(({ value, label }) => (
                    <option key={value} value={value}>
                      {value === '' ? '—' : (t[label] || label)}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t.dateOfBirth} error={errors.date_of_birth}>
                <DatePicker
                  value={form.date_of_birth}
                  onChange={(val) => {
                    setForm((f) => ({ ...f, date_of_birth: val }));
                    if (errors.date_of_birth) setErrors((er) => ({ ...er, date_of_birth: undefined }));
                  }}
                  max={new Date().toISOString().split('T')[0]}
                  locale={lang}
                  placeholder={lang === 'vi' ? 'dd/mm/yyyy' : 'mm/dd/yyyy'}
                />
              </Field>
            </div>

            <Field label={t.bio} hint={`${form.bio.length}/200`} error={errors.bio}>
              <textarea
                className="ep-input ep-textarea"
                maxLength={210}
                rows={3}
                value={form.bio}
                onChange={set('bio')}
                placeholder={t.labelPlaceholderBio}
              />
            </Field>
          </Section>

          {/* ── Contact ─────────────────────────────────────────────────── */}
          <Section title={t.sectionContact}>
            <Field
              label={t.email}
              hint={emailLocked ? null : t.emailWarning}
              error={errors.email}
            >
              {emailLocked && <WarnBanner message={t.emailLocked} />}
              <input
                className="ep-input"
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="you@example.com"
                disabled={emailLocked}
              />
            </Field>

            <Field label={t.phone} error={errors.phone}>
              <input
                className="ep-input"
                type="tel"
                value={form.phone}
                onChange={set('phone')}
                placeholder={t.labelPlaceholderPhone}
              />
            </Field>
          </Section>

          {/* ── Location ────────────────────────────────────────────────── */}
          <Section title={t.sectionLocation}>
            <div className="ep-row-3">
              <Field label={t.country} error={errors.country}>
                <select
                  className="ep-input ep-select"
                  value={form.country}
                  onChange={(e) => {
                    const nextCountry = e.target.value;
                    setForm((f) => ({ ...f, country: nextCountry, city: '', ward: '' }));
                    setCityCode('');
                    setWardCode('');
                    setCityOptions([]);
                    setWardOptions([]);
                    if (errors.country || errors.city || errors.ward) {
                      setErrors((er) => ({ ...er, country: undefined, city: undefined, ward: undefined }));
                    }
                  }}
                >
                  <option value="">{t.countrySelectPlaceholder || 'Select country'}</option>
                  {countryOptions.map((country) => (
                    <option key={country.value} value={country.value}>{country.label}</option>
                  ))}
                </select>
              </Field>

              <Field label={t.city} error={errors.city}>
                <select
                  className="ep-input ep-select"
                  value={cityCode}
                  disabled={!form.country || loadingCities || cityOptions.length === 0}
                  onChange={(e) => {
                    const code = e.target.value;
                    const picked = cityOptions.find((c) => String(c.code) === code);
                    setCityCode(code);
                    setWardCode('');
                    setForm((f) => ({ ...f, city: picked?.name || '', ward: '' }));
                    setWardOptions([]);
                    if (errors.city || errors.ward) {
                      setErrors((er) => ({ ...er, city: undefined, ward: undefined }));
                    }
                  }}
                >
                  <option value="">
                    {loadingCities
                      ? (t.loadingCities || 'Loading cities...')
                      : (t.citySelectPlaceholder || 'Select city')}
                  </option>
                  {cityOptions.map((city) => (
                    <option key={city.code} value={String(city.code)}>{city.name}</option>
                  ))}
                </select>
              </Field>

              <Field label={t.ward} error={errors.ward}>
                <select
                  className="ep-input ep-select"
                  value={wardCode}
                  disabled={!cityCode || loadingWards || wardOptions.length === 0}
                  onChange={(e) => {
                    const code = e.target.value;
                    const picked = wardOptions.find((w) => String(w.code) === code);
                    setWardCode(code);
                    setForm((f) => ({ ...f, ward: picked?.name || '' }));
                    if (errors.ward) {
                      setErrors((er) => ({ ...er, ward: undefined }));
                    }
                  }}
                >
                  <option value="">
                    {loadingWards
                      ? (t.loadingWards || 'Loading wards...')
                      : (t.wardSelectPlaceholder || 'Select ward')}
                  </option>
                  {wardOptions.map((ward) => (
                    <option key={ward.code || ward.name} value={String(ward.code)}>{ward.name}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* ── Links & Social ───────────────────────────────────────────── */}
          <Section title={t.sectionSocial}>
            <Field label={t.websiteUrl} error={errors.website_url}>
              <input className="ep-input" type="url" maxLength={255} value={form.website_url} onChange={set('website_url')} placeholder={t.labelPlaceholderWebsite} />
            </Field>
            <div className="ep-row-2">
              <Field label={t.socialTwitter} error={errors.social_twitter}>
                <input className="ep-input" type="text" maxLength={50} value={form.social_twitter} onChange={set('social_twitter')} placeholder={t.labelPlaceholderTwitter} />
              </Field>
              <Field label={t.socialInstagram} error={errors.social_instagram}>
                <input className="ep-input" type="text" maxLength={50} value={form.social_instagram} onChange={set('social_instagram')} placeholder={t.labelPlaceholderInstagram} />
              </Field>
            </div>
          </Section>

          {/* ── Preferences ──────────────────────────────────────────────── */}
          <Section title={t.sectionPrefs}>
            <div className="ep-row-3">
              <Field label={t.locale} error={errors.locale}>
                <select className="ep-input ep-select" value={form.locale} onChange={set('locale')}>
                  <option value="" disabled>—</option>
                  {LOCALES.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
              </Field>

              <Field label={t.timezone} error={errors.timezone}>
                <select className="ep-input ep-select" value={form.timezone} onChange={set('timezone')}>
                  <option value="" disabled>—</option>
                  {!timezoneExists && <option value={form.timezone}>({getUtcOffsetLabel(form.timezone)}) {form.timezone}</option>}
                  {timezoneSelectOptions.map((tz) => (
                    <option key={tz.value} value={tz.value}>{tz.label}</option>
                  ))}
                </select>
              </Field>

              <Field label={t.profileVisibility} error={errors.profile_visibility}>
                <select className="ep-input ep-select" value={form.profile_visibility} onChange={set('profile_visibility')}>
                  {VISIBILITIES.map(({ value, label }) => (
                    <option key={value} value={value}>{t[label] || label}</option>
                  ))}
                </select>
              </Field>
            </div>
          </Section>

          {/* ── Server error ─────────────────────────────────────────────── */}
          {serverError && <div className="ep-server-error">⚠️ {serverError}</div>}

          {/* ── Success message ───────────────────────────────────────────── */}
          {success && <div className="ep-success-banner">✅ {t.successMessage}</div>}

          {/* ── Action buttons ────────────────────────────────────────────── */}
          <div className="ep-actions">
            <button type="button" className="ep-cancel-btn" onClick={() => navigate(-1)} disabled={saving}>
              {t.cancelButton}
            </button>
            <button type="submit" className="ep-save-btn" disabled={saving}>
              {saving ? (
                <span className="ep-saving">
                  <span className="ep-spin">🐾</span> {t.saving}
                </span>
              ) : t.saveButton}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
