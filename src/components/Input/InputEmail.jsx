/* eslint-disable react/prop-types */
const TextInput = ({ label, value, onChange, placeholder, readOnly = false }) => {
  return (
    <div className="relative mb-4" data-twe-input-wrapper-init>
        <input
        type="email"
         className="peer block min-h-[auto] w-full rounded border border-revamp-primary-600 px-3 py-[0.32rem] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-revamp-primary-600 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        />
        <label
        className={`${value ? 'pointer-events-none absolute text-revamp-primary-600 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-500 transition-all duration-200 ease-out bg-white -translate-y-[0.9rem] scale-[0.8] peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none' : 'pointer-events-none absolute text-revamp-primary-600 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-500 transition-all duration-200 ease-out peer-focus:bg-white mt-[0.37rem] peer-focus:mt-0 peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-revamp-primary-600 peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none'}`}
        >{label}
    </label>
    </div>
  );
};

export default TextInput;
