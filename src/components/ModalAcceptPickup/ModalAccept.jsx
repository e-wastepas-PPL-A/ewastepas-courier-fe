/* eslint-disable react/prop-types */

const ModalAccept = ({ setIsOpen, isOpen }) => {
  return (
    <>
      <div className="fixed z-50 inset-0 bg-gray-900 bg-opacity-60 overflow-y-auto h-full w-full px-4 ">
        <div className="relative top-40 mx-auto shadow-xl rounded-md bg-white max-w-md">
          <div className="flex justify-end p-2">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="p-6 pt-0 text-center">
            <h3 className="text-xl font-normal text-gray-500 mt-5 mb-6">
              Apakah anda yakin menerima permintaan?
            </h3>
            <div className="flex justify-center gap-5">
              <a
                href="#"
                className="text-white bg-revamp-success-500 hover:bg-gray-100 focus:ring-4 focus:ring-cyan-200 border font-medium inline-flex items-center rounded-lg text-base px-3 py-2.5 text-center"
                data-modal-toggle="delete-user-modal">
                Ya
              </a>
              <a
                href="#"
                className="text-white bg-revamp-error-600 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-base inline-flex items-center px-3 py-2.5 text-center mr-2">
                Tidak
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalAccept;