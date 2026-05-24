import { createContext, useEffect, useMemo, useState } from 'react';
import en from './en.json';
import vi from './vi.json';

export const STORAGE_KEY = 'purrvibex-lang';
export const TEXTS = { en, vi };
export const LanguageContext = createContext(null);

export function detectLanguage() {
  if (typeof window === 'undefined') {
    return 'en';
  }

  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'en' || stored === 'vi') {
    return stored;
  }

  const browserLang = window.navigator.language?.toLowerCase() || '';
  return browserLang.startsWith('vi') ? 'vi' : 'en';
}

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(detectLanguage);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      setLang,
      toggleLang: () => setLang((current) => (current === 'en' ? 'vi' : 'en')),
      strings: TEXTS[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

