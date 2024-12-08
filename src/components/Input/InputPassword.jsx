/* eslint-disable react/prop-types */
import { useState } from "react";
import IcEyeOpen from "../../assets/ic-eye-open.svg";
import IcEyeClose from "../../assets/ic-eye-close.svg";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  errorMessage = "",
  isValidateCheck = false,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Validation checks
  const isValidLength = value.length >= 8 && value.length <= 20;
  const hasUppercase = /[A-Z]/.test(value);
  const hasNumber = /\d/.test(value);
  const hasSpecialChar = /[#!?$&@.]/.test(value);

  const isInvalid =
    isValidateCheck && isFocused &&
    (!isValidLength || !hasUppercase || !hasNumber || !hasSpecialChar) || errorMessage.length > 0 &&
    (!isValidLength || !hasUppercase || !hasNumber || !hasSpecialChar) ;

  // Handlers
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);
  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  // CSS classes
  const inputClass = `
    peer block w-full rounded border px-3 py-[0.50rem] outline-none transition-all duration-200 
    ease-linear min-h-[auto]
    ${isInvalid ? "border-revamp-error-500" : "border-revamp-neutral-10"}
    focus:placeholder:opacity-100 peer-focus:text-revamp-neutral-10
    data-[twe-input-state-active]:placeholder:opacity-100
    motion-reduce:transition-none
    [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0
  `;

  const labelClass = `
    pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate 
    text-neutral-500 transition-all duration-200 ease-out bg-white text-base
    ${
      value
        ? "-translate-y-[0.9rem]"
        : "mt-[0.57rem] peer-focus:mt-0 peer-focus:-translate-y-[0.9rem]"
    }
    peer-focus:text-revamp-neutral-10 motion-reduce:transition-none
  `;

  const validationMessage = (
    <div className="flex flex-col items-start text-base">
      <p>Kata sandi Anda setidaknya harus memiliki:</p>
      <p className={isValidLength ? "text-revamp-success-400" : "text-revamp-error-500"}>
        ✓ 8 karakter (20 maks)
      </p>
      <p
        className={
          hasUppercase && hasNumber ? "text-revamp-success-400" : "text-revamp-error-500"
        }
      >
        ✓ 1 huruf kapital dan 1 angka
      </p>
      <p className={hasSpecialChar ? "text-revamp-success-400" : "text-revamp-error-500"}>
        ✓ 1 karakter khusus (contoh: . # ? ! $ & @)
      </p>
    </div>
  );

  return (
    <div className={`relative ${errorMessage.length > 0 ? 'mb-4' : 'mb-6'}`} data-twe-input-wrapper-init>
      <input
        type={isPasswordVisible ? "text" : "password"}
        className={inputClass}
        value={value}
        onChange={(e)=> onChange(e.target.value)}
        placeholder={placeholder}
        readOnly={readOnly}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <label className={labelClass}>{label}</label>
      <button
        type="button"
        onClick={togglePasswordVisibility}
        className="absolute top-[10px] right-0 px-3 flex items-center text-base leading-5"
      >
        <img
          src={isPasswordVisible ? IcEyeOpen : IcEyeClose}
          alt="toggle visibility"
          className="w-[20px]"
        />
      </button>
      {isValidateCheck && isFocused ? validationMessage : (
        <div className="flex flex-col items-start text-revamp-error-500 text-base">{errorMessage}</div>
      )}
    </div>
  );
};

export default TextInput;
