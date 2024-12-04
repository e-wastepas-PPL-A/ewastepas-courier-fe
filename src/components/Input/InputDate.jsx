/* eslint-disable react/prop-types */
import { Datepicker } from "flowbite-react";
import { useState, useEffect, useRef } from "react";
import IcDate from "../../assets/ic-date.svg";

const TextDate = ({ label, value = null, onChange, placeholder, errorMessage, max, min }) => {
  const hasError = errorMessage?.length > 0;
  const [isDatepickerVisible, setDatepickerVisible] = useState(false);
  const maxYear = max?.split("-")[0]
  const maxMounth = max?.split("-")[1]
  const maxDay = max?.split("-")[2]
  const minYear = min?.split("-")[0]
  const minMounth = min?.split("-")[1]
  const minDay = min?.split("-")[2]

  const wrapperRef = useRef(null);

  const customTheme = {
    root: { base: "relative" },
    popup: {
      root: {
        base: "absolute top-10 z-50 block pt-2",
        inline: "relative top-0 z-auto",
        inner: "inline-block rounded-lg bg-white p-4 shadow-lg",
      },
      header: {
        base: "",
        title: "px-2 py-3 text-center font-semibold text-gray-900",
        selectors: {
          base: "mb-2 flex justify-between",
          button: {
            base: "rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200",
          },
        },
      },
      view: { base: "p-1" },
      footer: {
        base: "mt-2 flex space-x-2",
        button: {
          base: "w-full rounded-lg px-5 py-2 text-center text-sm font-medium focus:ring-4 focus:ring-cyan-300",
          today: "bg-revamp-secondary-500 text-white hover:bg-cyan-800",
          clear: "border border-gray-300 bg-white text-gray-900 hover:bg-gray-100",
        },
      },
    },
    views: {
      days: {
        header: {
          base: "mb-1 grid grid-cols-7",
          title: "h-6 text-center text-sm font-medium leading-6 text-gray-500",
        },
        items: {
          base: "grid w-64 grid-cols-7",
          item: {
            base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100",
            selected: "bg-revamp-secondary-500 text-white hover:bg-cyan-600",
            disabled: "text-gray-500",
          },
        },
      },
      months: { items: { base: "grid w-64 grid-cols-4", item: { base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100", selected: "bg-revamp-secondary-500 text-white hover:bg-cyan-600", disabled: "text-gray-500" } } },
      years: { items: { base: "grid w-64 grid-cols-4", item: { base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100", selected: "bg-revamp-secondary-500 text-white hover:bg-cyan-600", disabled: "text-gray-500" } } },
      decades: { items: { base: "grid w-64 grid-cols-4", item: { base: "block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100", selected: "bg-revamp-secondary-500 text-white hover:bg-cyan-600", disabled: "text-gray-500" } } },
    },
  };
  

  const handleInputFocus = () => {
    setDatepickerVisible(true);
  };

  const handleDateChange = (date) => {
    onChange(date);
    setDatepickerVisible(false);
};

useEffect(() => {
  const handleClickOutside = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setDatepickerVisible(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);

const displayDate = value ? value.toLocaleDateString('en-GB') : ""; 

  return (
    <div  className={`${errorMessage?.length > 0 ? 'mb-4' : 'mb-6'}`}>
    <div ref={wrapperRef} className="relative" data-twe-input-wrapper-init>
        {isDatepickerVisible || value ? (
         <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <img
          src={IcDate}
          alt="toggle visibility"
          className="w-[20px]"
        />
        </div>
        ):null}
        <input
        type="text"
        className={`peer block min-h-[auto] w-full rounded border pl-[40px] ${hasError ? "border-revamp-error-500" : "border-revamp-neutral-10"} px-3 py-[0.50rem] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-revamp-neutral-10 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0`}
        value={displayDate}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={true}
        onFocus={handleInputFocus}
        />
        <label
       className={`${isDatepickerVisible || value ? 'pointer-events-none absolute text-revamp-neutral-10 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-500 transition-all duration-200 ease-out bg-white -translate-y-[0.9rem] scale-[0.8] peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none' : 'pointer-events-none absolute text-revamp-neutral-10 left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate text-neutral-500 transition-all duration-200 ease-out peer-focus:bg-white mt-[0.57rem] peer-focus:mt-0 peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-revamp-neutral-10 peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none'}`}
        >{label}
    </label>

     {isDatepickerVisible && (<Datepicker inline showTodayButton={false}  autoHide={true} maxDate={max ? new Date(maxYear, maxMounth, maxDay) : ""} minDate={min ? new Date(minYear, minMounth, minDay) : ""} defaultValue={new Date(2000,0,1)} value={value || null} onChange={handleDateChange} theme={customTheme} className="absolute text-black" />)}
    </div>
    {hasError && <div className="text-revamp-error-500 flex text-base">{errorMessage}</div>}
    </div>
  );
};

export default TextDate;
