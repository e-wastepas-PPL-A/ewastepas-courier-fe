/* eslint-disable react/prop-types */
const PickupResult = ({ img, heading, subHeading, handleRefresh }) => {
  return (
    <div className="flex flex-col items-center justify-centen">
      <div className="bg-green-500 rounded-full p-6">
        <img src={img} alt="Success" className="w-32 h-32" />
      </div>
      <h2 className="text-2xl font-bold mt-4">{heading}</h2>
      <p className="text-gray-600 font-medium mt-2">{subHeading}</p>
      <button
        className="bg-revamp-secondary-500 rounded-2xl text-white px-4 py-2 mt-4"
        onClick={handleRefresh}>
        Back to menu
      </button>
    </div>
  );
};

export default PickupResult;
