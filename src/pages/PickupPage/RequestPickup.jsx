import Table from "../../components/Tables/DataTable";
import { formatDate } from "../../utils/date";
import { CheckIcon, EyeIcon } from "lucide-react";
import DetailModal from "../../components/Modal/DetailPickupModal";
import ConfirmPickup from "../../components/Modal/ConfirmPickup";
import { useCourier } from "../../stores/courier";
import useHandleModal from "../../hooks/useHandleModal";
import { useMemo } from "react";
import ErrorPage from "../Error/Error";

export default function RequestPickupPage() {
  const users = useCourier((state) => state.userDummy);
  const {
    pickup,
    selectedRow,
    selectedRowId,
    isLoading,
    isDetailOpen: isOpen,
    isModal: isAccepted,
    error,
    handleOpen,
    handleClose,
    handleAction,
    setPickup,
  } = useHandleModal();

  const columns = [
    {
      name: "Nama Customer",
      selector: (row) => row.community?.name ?? "-",
    },
    {
      name: "Tanggal",
      selector: (row) => formatDate(row.pickup_date),
      sortable: true,
      sortFunction: (a, b) => new Date(a.pickup_date) - new Date(b.pickup_date),
    },
    {
      name: "Alamat",
      selector: (row) => row.pickup_address,
    },
    {
      name: "Kategori",
      selector: (row) => row.wasteDetails[0]?.wasteName ?? "-",
    },
    {
      name: "Total Sampah",
      selector: (row) => row.wasteDetails[0]?.quantity ?? "-",
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-row gap-2">
          <button onClick={() => handleAction(row.pickup_id)}>
            <CheckIcon color="#005b96" />
          </button>
          <button
            className="text-xl cursor-pointer"
            onClick={() => handleOpen(row)}>
            <EyeIcon color="#005b96" />
          </button>
        </div>
      ),
    },
  ];

  const handleFilter = (data) => {
    return data.filter(
      (p) => p.pickup_status === "Menunggu_Penjemputan" && p.courier === null
    );
  };

  const acceptedPickupRow = (rowId) => {
    return setPickup((prevPickup) =>
      prevPickup.filter((row) => row.pickup_id !== rowId)
    );
  };

  const filterMemo = useMemo(() => {
    return handleFilter(pickup);
  }, [pickup]);

  if (isLoading) {
    return <div className="loader mx-auto items-center mt-5"></div>;
  }

  if (error) {
    return <ErrorPage>{error.message}</ErrorPage>;
  }

  return (
    <>
      {isOpen && (
        <DetailModal selectedRow={selectedRow} handleClose={handleClose}>
          <button
            className="border border-revamp-secondary-400 text-revamp-secondary-400 px-4 py-2 rounded-md"
            onClick={handleClose}>
            Tutup
          </button>
        </DetailModal>
      )}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-11 font-bold">
          Detail Permintaan Penjemputan Sampah
        </h1>
        <p className="text-revamp-neutral-8 mt-1">
          Berikut adalah list permintaan penjemputan sampah yang tersedia. Kurir
          bisa memilih permintaan pickup yang ingin diambil.
        </p>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table
            columns={columns}
            emptyData={"Tidak ada Permintaan Pickup"}
            data={filterMemo}
          />
          {isAccepted && (
            <ConfirmPickup
              pickupId={selectedRowId}
              courierId={users.courier_id}
              handleClose={handleClose}
              acceptedPickupRow={acceptedPickupRow}
            />
          )}
        </div>
      </div>
    </>
  );
}
