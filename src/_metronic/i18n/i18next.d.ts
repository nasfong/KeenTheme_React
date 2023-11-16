export interface ILanguage {
  HELLO: string
  VALIDATION: {
    MUST_BE_CHARACTER_OR_LESS: string
    MUST_BE_CHARACTER_OR_MORE: string
    IS_REQUIRED: string
    EMAIL: string
    LENGTH: string
    MUST_BE_VALUE_OR_LESS: string
    MUST_BE_VALUE_OR_MORE: string
  }
  FORM: {
    FIRST_NAME: string
    LAST_NAME: string
    EMAIL: string
    PASSWORD: string
    CONFIRM_PASSWORD: string
  }
}

//? { t } useTranslation Type
declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'en'
    resources: {
      en: ILanguage
    }
  }
}
