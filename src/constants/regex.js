export const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
export const PHONE_REGEX = /^[0-9]+$/
export const UPPERCASE_REGEX = /[A-Z]/
export const SYMBOL_REGEX = /[^\w\s]/

/*
   - At least one uppercase letter: `(?=.*[A-Z])`
   - At least one lowercase letter: `(?=.*[a-z])`
   - At least one digit: `(?=.*\d)`
   - At least one special character: `(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>/?])`
   - Minimum length of 8 characters: `.{8,}`
*/
export const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\\[\]{};':"\\|,.<>/?]).{8,}$/