import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization';

import en from './en';
import ru from './ru';
import kk from './kk';

// Get the device locale
const deviceLocale = Localization.locale.split('-')[0];

// Define supported locales
const supportedLocales = ['en', 'ru', 'kk'];

// Determine the initial locale
// If the device locale is supported, use it; otherwise, default to Kazakh (kk)
const initialLocale = supportedLocales.includes(deviceLocale) ? deviceLocale : 'kk';

// Initialize i18next
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      ru: { translation: ru },
      kk: { translation: kk },
    },
    lng: initialLocale,
    fallbackLng: 'kk',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n; 