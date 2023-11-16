import { ILanguage } from '../i18next'

export const kh: ILanguage = {
  HELLO: 'សួស្តីពិភពលោក!',
  VALIDATION: {
    IS_REQUIRED: '{{label}} មិនទាន់បានបំពេញ!',
    MUST_BE_CHARACTER_OR_MORE: 'ត្រូវតែតិចជាង {{min}} តួអក្សរ!',
    MUST_BE_CHARACTER_OR_LESS: 'ត្រូវតែច្រើនជាង {{max}} តួអក្សរ!',
    EMAIL: 'បញ្ចូលបានតែអីមែល!',
    LENGTH: '{{label}} ត្រូវតែមាន {{length}} តួ!',
    MUST_BE_VALUE_OR_MORE: 'ត្រូវតែច្រើនជាងរឺស្មើ {{min}}!',
    MUST_BE_VALUE_OR_LESS: 'ត្រូវតែតិចជាងរឺស្មើ {{max}}!',
  },
  FORM: {
    FIRST_NAME: 'នាម',
    LAST_NAME: 'ត្រកូល',
    EMAIL: 'អីមែល',
    PASSWORD: 'ពាក្យសំងាត់',
    CONFIRM_PASSWORD: 'ផ្ទៀងផ្ទាត់ពាក្យសំងាត់',
  },
}
