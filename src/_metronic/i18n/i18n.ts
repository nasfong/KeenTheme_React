import i18n, { t } from 'i18next'
import { initReactI18next } from 'react-i18next'
import { en, kh } from '.'
import backend from 'i18next-http-backend'

import * as Yup from 'yup'
Yup.setLocale({
  mixed: {
    required: ({ path, label }) =>
      t('VALIDATION.IS_REQUIRED', { label: path || label }), //path == label if label have value
  },
  string: {
    length: ({ path, length }) =>
      t('VALIDATION.LENGTH', { label: path, length }),
    min: ({ min }) => t('VALIDATION.MUST_BE_CHARACTER_OR_MORE', { min }),
    max: ({ max }) => t('VALIDATION.MUST_BE_CHARACTER_OR_LESS', { max }),
    email: () => t('VALIDATION.EMAIL'),
  },
  number: {
    min: ({ min }) => t('VALIDATION.MUST_BE_VALUE_OR_MORE', { min }),
    max: ({ max }) => t('VALIDATION.MUST_BE_VALUE_OR_LESS', { max }),
  },
  date: {
    min: ({ min }) => min.toString(),
    max: ({ max }) => t('VALIDATION.MUST_BE_VALUE_OR_LESS', { max }),
  },
})

const resources = {
  en: { translation: en },
  kh: { translation: kh },
} as const

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(backend)
  .init({
    resources,
    // debug: true,
    backend: {
      // loadPath: `http://localhost:8000/{{lng}}`,
    },
    lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: ['en', 'kh'],
    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    defaultNS: 'translation',
    // fallbackNS: 'fallback',
    // ns: ['en'],
    react: { useSuspense: false },
  })

export default i18n
