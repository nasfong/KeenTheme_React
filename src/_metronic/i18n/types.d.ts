export interface ILanguage {
    HELLO: string
    VALIDATION: IValidation,
    FORM: IField,
}

interface IValidation {
    MUST_BE_15_CHARACTER_OR_LESS: string
}

interface IField {
    FIRST_NAME: string
    LAST_NAME: string
    EMAIL: string
}
