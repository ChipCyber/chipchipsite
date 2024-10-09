import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import XHR from 'i18next-xhr-backend'
import LanguageDetector from 'i18next-browser-languagedetector'

import translationEN from './locales/en.json';
import translationZH from './locales/zh_CN.json';

const resources = {
  en: {
    translation: translationEN
  },
  zh_CN: {
    translation: translationZH
  },
};

i18next
  .use(XHR)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // backend: {
    //   loadPath: `./locales/{{lng}}.json`
    // },
    react: {
      useSuspense: false
    },
    // lng: 'en',
    fallbackLng: 'en',
    preload: ['en'],
    keySeparator: false,
    interpolation: { escapeValue: false }
  })

export default i18next
