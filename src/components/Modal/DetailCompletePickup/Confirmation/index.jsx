/* eslint-disable react/prop-types */
import PickupResult from "../../PickupResult";
import SuccessIcon from "../../../../assets/success.png";
import failedIcon from "../../../../assets/success.png";

const Confirmation = ({
  handleClose,
  heading,
  confirmFetch,
  loading,
  status,
}) => {
  if (status === "success") {
    return (
      <h1 className="font-bold text-xl text-center text-green-500">
        <PickupResult
          img={SuccessIcon}
          handleClose={handleClose}
          heading="Berhasil Diselesaikan"
          subHeading="Pickup telah diselesaikan!"
        />
      </h1>
    );
  } else if (status === "failed") {
    return (
      <h1 className="font-bold text-xl text-center text-red-500">
        <PickupResult
          img={failedIcon}
          handleClose={handleClose}
          heading="Gagal menyelesaikan pickup"
          subHeading="Coba lagi nanti!"
        />
      </h1>
    );
  } else {
    return (
      <>
        <h1 className="font-bold text-xl text-center">{heading}</h1>
        <div className="flex justify-center mt-2 gap-2">
          <button
            className="border bg-revamp-secondary-400 text-white px-4 py-2 rounded-md"
            onClick={confirmFetch}
            disabled={loading}>
            {loading ? "Loading..." : "Ya"}
          </button>
          <button
            className="border bg-[#E72929] text-white px-4 py-2 rounded-md"
            onClick={handleClose}>
            Tidak
          </button>
        </div>
      </>
    );
  }
};

export default Confirmation;
