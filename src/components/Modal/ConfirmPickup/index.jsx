import { useState } from "react";
import { patchAcceptPickup } from "../../../services";
import PickupResult from "../PickupResult";
import SuccessIcon from "../../../assets/success.png";
import failedIcon from "../../../assets/failed.png";

/* eslint-disable react/prop-types */
const ConfirmPickup = ({
  pickupId,
  courierId,
  handleClose,
  acceptedPickupRow,
}) => {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleRequest = () => {
    setLoading(true);
    new Promise((resolve, reject) => {
      async function fetchData(pickupId, courierId) {
        try {
          const response = await patchAcceptPickup(pickupId, courierId);
          resolve(response);
        } catch (error) {
          reject(error);
        }
      }
      fetchData(pickupId, courierId);
    })
      .then(() => {
        setStatus("success");
        acceptedPickupRow(pickupId);
      })
      .catch(() => {
        setStatus("failed");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center">
      {/* background */}
      <div
        className="w-full h-[100dvh] bg-black-100/80 opacity-[0.8]"
        onClick={handleClose}></div>
      <div className="fixed p-[12px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] w-[400px] overflow-x-auto">
        {/* content */}
        <div className="h-full flex flex-col justify-center items-center">
          {status === "success" ? (
            <h1 className="font-bold text-xl text-center text-green-500">
              <PickupResult
                img={SuccessIcon}
                handleClose={handleClose}
                heading="Berhasil Ditambahkan"
                subHeading="Permintaan berhasil diterima!"
              />
            </h1>
          ) : status === "failed" ? (
            <h1 className="font-bold text-xl text-center text-red-500">
              <PickupResult
                img={failedIcon}
                handleClose={handleClose}
                heading="Gagal menambahkan"
                subHeading="Permintaan gagal Ditambahkan"
              />
            </h1>
          ) : (
            <>
              <h1 className="font-bold text-xl text-center">
                Apakah anda yakin ingin menerima permintaan ini?
              </h1>
              <div className="text-center w-full">
                <div>
                  <div className="mb-[24px]"></div>
                </div>
              </div>
              <div className="flex justify-center mt-2 gap-2">
                <button
                  className="border bg-revamp-secondary-400 text-white px-4 py-2 rounded-md"
                  onClick={handleRequest}
                  disabled={loading}>
                  {loading ? "Loading..." : "Ya"}
                </button>
                <button
                  className="border bg-[#E72929] text-white px-4 py-2 rounded-md"
                  onClick={handleClose}
                  disabled={loading}>
                  Tidak
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmPickup;
