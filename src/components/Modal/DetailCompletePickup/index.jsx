import { formatDate } from "../../../utils/date";
import phoneIcon from "../../../assets/phone-icon.svg";
import { useState } from "react";
import Confirmation from "./Confirmation";
import { patchCompletePickup } from "../../../services";

/* eslint-disable react/prop-types */
const DetailCompletePickupModal = ({
  selectedRow,
  handleClose,
  handleState,
}) => {
  const [status, setStatus] = useState(null);
  const [isComplete, setIsComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  if (!selectedRow) return null;

  const handleCompleteRequest = () => {
    setLoading(true);
    const pickupId = selectedRow.pickup_id;
    new Promise((resolve, reject) => {
      async function fetchData(pickupId) {
        try {
          const response = await patchCompletePickup(pickupId);
          if (response.success === false) {
            reject("Failed to complete pickup");
          }
          resolve(response);
          handleState(pickupId);
        } catch (error) {
          reject(error);
        }
      }
      fetchData(pickupId);
    })
      .then(() => {
        setStatus("success");
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
      <div className="fixed p-[12px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] w-[450px] overflow-x-auto">
        {/* content */}
        {isComplete ? (
          <Confirmation
            heading="Apakah anda yakin ingin menyelesaikan pickup ini?"
            handleClose={handleClose}
            confirmFetch={handleCompleteRequest}
            loading={loading}
            status={status}
          />
        ) : (
          <div className="h-full">
            <h1 className="font-bold text-2xl">Informasi Detail Penjemputan</h1>
            <div className="text-center w-full">
              <div>
                <div className="mb-[24px]"></div>
              </div>
            </div>
            <table className="mt-4">
              <tbody>
                <tr>
                  <td className="font-semibold">Nama Lengkap</td>
                  <td className="font-semibold px-3">:</td>
                  <td className="pl-5 text-md">{selectedRow.community.name}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Alamat Lengkap</td>
                  <td className="font-semibold px-3">:</td>
                  <td className="pl-5 text-md font-medium">
                    {selectedRow.pickup_address}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Kontak Pengguna</td>
                  <td className="font-semibold px-3">:</td>
                  <td className="pl-5 text-md font-medium">
                    {selectedRow.community.phone}
                  </td>
                </tr>
                <tr>
                  <td>‎</td>
                  <td>‎</td>
                  <td className="mt-2">
                    <a
                      href={`https://wa.me/${selectedRow.community.phone}`}
                      className="bg-revamp-secondary-500 text-white flex flex-row items-center px-4 py-1 rounded">
                      <img src={phoneIcon} alt="Phone" className="mr-2" />
                      Hubungi
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Tanggal Permintaan</td>
                  <td className="font-semibold px-3">:</td>
                  <td className="pl-5 text-md font-medium">
                    {formatDate(selectedRow.pickup_date)}
                  </td>
                </tr>
                <tr>
                  <td className="font-semibold">Kategori Sampah</td>
                  <td className="font-semibold px-3">:</td>
                  <td className="pl-5 text-md font-medium">Peralatan IT</td>
                </tr>
                <tr>
                  <td className="font-semibold">Total Sampah</td>
                  <td className="font-semibold px-3">:</td>
                  <td className="pl-5 text-md font-medium">8</td>
                </tr>
              </tbody>
            </table>
            <div className="flex justify-center mt-2">
              <button
                className="border border-revamp-secondary-400 text-revamp-secondary-400 px-4 py-2 rounded-md"
                onClick={() => setIsComplete(true)}>
                Selesaikan Pesanan
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailCompletePickupModal;
