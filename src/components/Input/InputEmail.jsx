/* eslint-disable react/prop-types */
const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  readOnly = false,
  errorMessage = "",
}) => {
  const hasError = errorMessage.length > 0;
  const labelClass = `
    pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate 
    text-neutral-500 transition-all duration-200 ease-out bg-white text-base
    ${
      value
        ? "-translate-y-[0.9rem]"
        : "mt-[0.57rem] peer-focus:mt-0 peer-focus:-translate-y-[0.9rem]"
    }
    ${
      value || hasError
        ? "peer-focus:text-revamp-neutral-10"
        : "peer-focus:text-revamp-neutral-10"
    }
    motion-reduce:transition-none
  `;

  const inputClass = `
    peer block w-full rounded border px-3 py-[0.50rem] outline-none transition-all 
    duration-200 ease-linear min-h-[auto]
    ${hasError ? "border-revamp-error-500" : "border-revamp-neutral-10"}
    focus:placeholder:opacity-100 peer-focus:text-revamp-neutral-10
    data-[twe-input-state-active]:placeholder:opacity-100
    motion-reduce:transition-none
    [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0
  `;

  return (
    <div className={`relative ${errorMessage.length > 0 ? 'mb-4' : 'mb-6'}`} data-twe-input-wrapper-init>
      <input
        type="email"
        className={inputClass}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      <label className={labelClass}>{label}</label>
      {hasError && <div className="text-revamp-error-500 flex text-base">{errorMessage}</div>}
    </div>
  );
};

export default TextInput;
