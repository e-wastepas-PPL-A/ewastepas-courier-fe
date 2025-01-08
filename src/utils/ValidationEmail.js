import { EMAIL_REGEX } from "../constants/regex";

const validateEmail = (value) => {
    if (!value) {
         return "Email tidak boleh kosong"
    }else if (!EMAIL_REGEX.test(value)) {
        return "Email tidak valid"
    } else {
        return ""
    }
};

export default validateEmail
