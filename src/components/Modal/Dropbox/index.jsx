/* eslint-disable react/prop-types */
const ModalDropbox = ({ selectedRow, handleClose }) => {
  if (!selectedRow) return null;
  return (
    <div className="fixed left-0 right-0 top-0 h-[100dvh] z-[99] flex justify-center items-center">
      {/* background */}
      <div
        className="w-full h-[100dvh] bg-black-100/80 opacity-[0.8]"
        onClick={handleClose}></div>
      <div className="fixed p-[12px] flex-col bg-white rounded-md justify-center items-center h-max-[500px] w-[400px] overflow-x-auto">
        {/* content */}
        <div className="h-full">
          <h1 className="font-bold text-2xl">Informasi Detail Drop Box</h1>
          <div className="text-center w-full">
            <div>
              <div className="mb-[24px]"></div>
            </div>
          </div>
          <table className="mt-4">
            <tbody>
              <tr>
                <td className="font-semibold">Nama Dropbox</td>
                <td className="font-semibold px-3">:</td>
                <td className="pl-5 text-md">{selectedRow.name}</td>
              </tr>
              <tr>
                <td className="font-semibold">Alamat</td>
                <td className="font-semibold px-3">:</td>
                <td className="pl-5 text-md font-medium">
                  {selectedRow.address}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Kapasitas</td>
                <td className="font-semibold px-3">:</td>
                <td className="pl-5 text-md font-medium">
                  {selectedRow.capacity}
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Status</td>
                <td className="font-semibold px-3">:</td>
                <td className="pl-5 text-md font-medium">
                  <span className="rounded-md border flex justify-center">
                    {selectedRow.status}
                  </span>
                </td>
              </tr>
              <tr>
                <td className="font-semibold">Total Sampah</td>
                <td className="font-semibold px-3">:</td>
                <td className="pl-5 text-md font-medium">
                  {100 - selectedRow.capacity}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-center mt-2">
            <button
              className="border border-revamp-secondary-400 text-revamp-secondary-400 px-4 py-2 rounded-md"
              onClick={handleClose}>
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDropbox;
