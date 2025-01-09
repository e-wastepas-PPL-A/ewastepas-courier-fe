/* eslint-disable react/prop-types */
import ErrorImage from "../../assets/error-server.png";

const Error = ({ children }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100">
      <img src={ErrorImage} alt="Server Error" width="400" height="400" />
      <h1 className="md:text-2xl text-md font-bold text-red-600">
        Something went wrong! Try again later
      </h1>
      <div className="text-sm md:text-lg lg:text-xl text-gray-700 mt-4">
        {children}
      </div>
    </div>
  );
};

export default Error;
