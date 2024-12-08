import { PHONE_REGEX } from "../constants/regex"

const validationPhone = (value) =>{
    if (!value) {
       return "No telepon tidak boleh kosong"
    }else if (!PHONE_REGEX.test(value)) {
        return "No telepon  tidak valid"
    }else if (value?.length < 8) {
        return "No telepon minimal 8 karakter"
    } else {
        return "";
    }
}

export default validationPhone