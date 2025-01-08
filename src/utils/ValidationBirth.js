const validationBirth = (value) =>{
    if (!value) {
        return `Tanggal lahir tidak boleh kosong`
    } else {
        const now = new Date(); // Tanggal saat ini
        const birthDate = new Date(value); // Tanggal yang dimasukkan

        if (birthDate > now) {
            return `Tanggal lahir tidak boleh di masa depan`
        } else {
            // Hitung usia berdasarkan tanggal lahir
            const age = now.getFullYear() - birthDate.getFullYear();
            const monthDiff = now.getMonth() - birthDate.getMonth();
            const dayDiff = now.getDate() - birthDate.getDate();

            // Pastikan usia kurang dari 17 tahun memperhitungkan bulan dan hari
            if (
                age < 17 ||
                (age === 17 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
            ) {
                return "Usia harus minimal 17 tahun"
            } else {
                return ""
            }
        }
      }
}

export default validationBirth