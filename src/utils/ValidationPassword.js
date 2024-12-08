import { PASSWORD_REGEX } from "../constants/regex";

const validatePassword = (value) => {
    if (!value) {
        return "Kata sandi tidak boleh kosong"
    } else if (!PASSWORD_REGEX.test(value)) {
        return "Kata sandi tidak valid"
    } else {
        return ""
    }
};
export default validatePassword
