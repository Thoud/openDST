import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEn from './en/translation.json';
import translationDe from './de/translation.json';

// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
i18n.use(initReactI18next).init({
  debug: true,
  fallbackLng: 'de',
  resources: {
    en: {
      translation: translationEn,
    },
    de: {
      translation: translationDe,
    },
  },
  interpolation: {
    escapeValue: false, // not needed for react as it escapes by default
  },
});

export default i18n;
