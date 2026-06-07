import { useMemo } from 'react';
import { useLanguage } from '../../i18n';
import { countryCodeToFlag, getCountryLabel, normalizeCountryCode } from '../../constants/countries.js';

export default function CountryBadge({ country, className = 'profile-country-badge' }) {
  const { strings, lang } = useLanguage();
  const profile = strings.profile;

  const code = useMemo(() => normalizeCountryCode(country), [country]);
  const label = code ? getCountryLabel(code, lang) : profile.unknownCountry;
  const flag = code ? countryCodeToFlag(code) : '🌍';

  return (
    <div className={className} title={label}>
      <span className="profile-country-icon" aria-hidden="true">{flag}</span>
      <span>{label}</span>
    </div>
  );
}

