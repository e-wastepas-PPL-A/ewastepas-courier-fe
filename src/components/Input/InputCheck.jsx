/* eslint-disable react/prop-types */
const CheckboxInput = ({ label, checked, onChange, errorMessage }) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center">
        <input checked={checked} onChange={onChange} id="checked-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-revamp-neutral-10" />
        <label htmlFor="checked-checkbox" className="ms-2 text-base font-medium text-gray-900 dark:text-gray-300 text-start">{label}</label>
      </div>
      <div className="text-revamp-error-500 text-base flex text-start">
        {errorMessage}
      </div>
  </div>
  );
};

export default CheckboxInput;
