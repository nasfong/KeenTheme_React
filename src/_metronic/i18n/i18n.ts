import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { ILanguage, en, kh } from ".";


const resources = {
  en: { translation: en },
  kh: { translation: kh }
} as const

//? { t } useTranslation Type
declare module "i18next" {
  interface CustomTypeOptions {
    defaultNS: "en";
    resources: {
      en: ILanguage
    };
  }
}

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en", // if you're using a language detector, do not define the lng option
    fallbackLng: ["en", "kh"],
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
    // fallbackNS: 'fallback',
    // defaultNS: 'en',
    // ns: ['en'],
  });

export default i18n

