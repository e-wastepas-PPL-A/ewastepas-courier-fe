const validateConfrimPassword = (value, password) => {
    if (!value) {
        return "Konfirmasi kata sandi tidak boleh kosong"
    }else if (password !== value) {
        return "Konfirmasi kata sandi tidak valid"
    } else {
        return ""
    }
};

export default validateConfrimPassword



