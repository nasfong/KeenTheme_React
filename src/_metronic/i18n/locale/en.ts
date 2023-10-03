import { ILanguage } from "../i18next";

export const en: ILanguage = {
    HELLO: "Hello World!",
    VALIDATION: {
        IS_REQUIRED: "{{label}} is required!",
        MUST_BE_CHARACTER_OR_MORE: "must be at least {{min}} characters!",
        MUST_BE_CHARACTER_OR_LESS: "must be at most {{max}} characters!",
        EMAIL: 'Allowed email only!',
        LENGTH: '{{label}} must be exactly {{length}} characters!',
        MUST_BE_VALUE_OR_MORE: 'must be greater than or equal to {{min}}!',
        MUST_BE_VALUE_OR_LESS: 'must be less than or equal to {{max}}!',
    },
    FORM: {
        FIRST_NAME: "First Name",
        LAST_NAME: "Last Name",
        EMAIL: "Email",
        PASSWORD: "Password",
        CONFIRM_PASSWORD: "Confirm Password",
    }
}