/* eslint-disable react/prop-types */
const TextInput = ({ label, value, onChange, placeholder, readOnly = false, errorMessage }) => {
  const hasError = errorMessage.length > 0;
  return (
    <div className={`relative ${errorMessage.length > 0 ? 'mb-4' : 'mb-6'}`} data-twe-input-wrapper-init>
        <input
        type="text"
          className={`peer block min-h-[auto] w-full rounded border ${hasError ? "border-revamp-error-500" : "border-revamp-neutral-10"} px-3 py-[0.50rem] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-revamp-neutral-10 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        />
        <label
       className={`${value ? 'pointer-events-none absolute text-revamp-neutral-10 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-500 transition-all duration-200 ease-out bg-white -translate-y-[0.9rem] scale-[0.8] peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none' : 'pointer-events-none absolute text-revamp-neutral-10 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-500 transition-all duration-200 ease-out peer-focus:bg-white mt-[0.57rem] peer-focus:mt-0 peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-revamp-neutral-10 peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none'}`}
        >{label}
    </label>
    {hasError && <div className="text-revamp-error-500 flex text-base">{errorMessage}</div>}
    </div>
  );
};

export default TextInput;
