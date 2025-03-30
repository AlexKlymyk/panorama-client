import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import en from './en.json'
import uk from './uk.json'
import pt from './pt.json'

const resources = {
  en: {
    translation: en
  },
  pt: {
    translation: pt
  },
  uk: {
    translation: uk
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: 'v3',
    supportedLngs: ['en', 'pt', 'uk'],
    fallbackLng: 'en',
    resources,
    interpolation: {
      escapeValue: false
    }
  })

  export default i18n