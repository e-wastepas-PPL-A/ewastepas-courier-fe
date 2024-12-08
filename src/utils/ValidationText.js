const validationText = (label, value, min, max)=>{
    if (!value) {
        return `${label} tidak boleh kosong`
      }else if (value?.length < min) {
        return `${label} minimal ${min} karakter`
      } else if (value?.length > max) {
         return `${label} maksimal ${max} karakter`
      }else  {
        return ""
    }    
}

export default validationText