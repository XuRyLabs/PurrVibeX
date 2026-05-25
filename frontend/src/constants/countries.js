const COUNTRY_CODES = [
  'AD','AE','AF','AG','AI','AL','AM','AO','AQ','AR','AS','AT','AU','AW','AX','AZ',
  'BA','BB','BD','BE','BF','BG','BH','BI','BJ','BL','BM','BN','BO','BQ','BR','BS','BT','BV','BW','BY','BZ',
  'CA','CC','CD','CF','CG','CH','CI','CK','CL','CM','CN','CO','CR','CU','CV','CW','CX','CY','CZ',
  'DE','DJ','DK','DM','DO','DZ',
  'EC','EE','EG','EH','ER','ES','ET',
  'FI','FJ','FK','FM','FO','FR',
  'GA','GB','GD','GE','GF','GG','GH','GI','GL','GM','GN','GP','GQ','GR','GS','GT','GU','GW','GY',
  'HK','HM','HN','HR','HT','HU',
  'ID','IE','IL','IM','IN','IO','IQ','IR','IS','IT',
  'JE','JM','JO','JP',
  'KE','KG','KH','KI','KM','KN','KP','KR','KW','KY','KZ',
  'LA','LB','LC','LI','LK','LR','LS','LT','LU','LV','LY',
  'MA','MC','MD','ME','MF','MG','MH','MK','ML','MM','MN','MO','MP','MQ','MR','MS','MT','MU','MV','MW','MX','MY','MZ',
  'NA','NC','NE','NF','NG','NI','NL','NO','NP','NR','NU','NZ',
  'OM',
  'PA','PE','PF','PG','PH','PK','PL','PM','PN','PR','PS','PT','PW','PY',
  'QA',
  'RE','RO','RS','RU','RW',
  'SA','SB','SC','SD','SE','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SR','SS','ST','SV','SX','SY','SZ',
  'TC','TD','TF','TG','TH','TJ','TK','TL','TM','TN','TO','TR','TT','TV','TW','TZ',
  'UA','UG','UM','US','UY','UZ',
  'VA','VC','VE','VG','VI','VN','VU',
  'WF','WS',
  'YE','YT',
  'ZA','ZM','ZW',
];

const COUNTRY_ALIAS_TO_CODE = {
  VIETNAM: 'VN',
  'VIET NAM': 'VN',
  USA: 'US',
  'UNITED STATES': 'US',
  'UNITED STATES OF AMERICA': 'US',
  UK: 'GB',
  'UNITED KINGDOM': 'GB',
  KOREA: 'KR',
  'SOUTH KOREA': 'KR',
};

function getDisplayNames(locale) {
  try {
    return new Intl.DisplayNames([locale], { type: 'region' });
  } catch {
    return null;
  }
}

export function getCountryLabel(code, locale = 'en') {
  if (!code) return '';
  const upper = String(code).toUpperCase();
  if (!COUNTRY_CODES.includes(upper)) return upper;

  const names = getDisplayNames(locale);
  return names?.of(upper) || upper;
}

export function getCountryOptions(locale = 'en') {
  return COUNTRY_CODES
    .map((code) => ({ value: code, label: getCountryLabel(code, locale) }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function countryCodeToFlag(countryCode) {
  if (!countryCode) return '🌍';
  const code = String(countryCode).toUpperCase();
  if (!/^[A-Z]{2}$/.test(code)) return '🌍';
  return String.fromCodePoint(...[...code].map((c) => 127397 + c.charCodeAt(0)));
}

// Accepts old stored country names and returns ISO-2 code when possible.
export function normalizeCountryCode(input) {
  if (input === null || input === undefined) return '';

  const raw = String(input).trim();
  if (!raw) return '';

  const upper = raw.toUpperCase();
  if (COUNTRY_CODES.includes(upper)) return upper;
  if (COUNTRY_ALIAS_TO_CODE[upper]) return COUNTRY_ALIAS_TO_CODE[upper];

  // Try matching localized names (EN + VI) to code.
  const locales = ['en', 'vi'];
  for (const locale of locales) {
    const names = getDisplayNames(locale);
    if (!names) continue;
    for (const code of COUNTRY_CODES) {
      const label = names.of(code);
      if (label && label.toUpperCase() === upper) {
        return code;
      }
    }
  }

  return '';
}

export { COUNTRY_CODES };

