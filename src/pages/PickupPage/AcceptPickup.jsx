import Table from "../../components/Tables/DataTable";
import { formatDate } from "../../utils/date";
import { EyeIcon, XIcon } from "lucide-react";
import { useCourier } from "../../stores/courier";
import CancelPickup from "../../components/Modal/CancelPickup";
import useHandleModal from "../../hooks/useHandleModal";
import { useMemo } from "react";
import DetailCompletePickupModal from "../../components/Modal/DetailCompletePickup";
import ErrorPage from "../Error/Error";
import { statusPickup } from "../../utils/status";

export default function AcceptPickupPage() {
  const users = useCourier((state) => state.userDummy);
  const {
    pickup,
    selectedRow,
    selectedRowId,
    isLoading,
    isDetailOpen,
    isModal: isCancelled,
    error,
    handleOpen,
    handleClose,
    handleAction,
    setPickup,
  } = useHandleModal();

  const columns = [
    {
      name: "Nama Customer",
      selector: (row) => row.community.name,
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
      name: "Status",
      selector: (row) => statusPickup(row.pickup_status),
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-row gap-2">
          <button onClick={() => handleAction(row.pickup_id, "reject")}>
            <XIcon color="#005b96" />
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

  const filterMemo = useMemo(() => {
    const handleFilter = (data) => {
      return data.filter(
        (p) =>
          p.pickup_status === "Dalam_Perjalanan" &&
          p.courier?.name === users.name
      );
    };
    return handleFilter(pickup);
  }, [pickup, users.name]);

  const handleStateRow = (rowId) => {
    return setPickup((prevPickup) =>
      prevPickup.filter((row) => row.pickup_id !== rowId)
    );
  };

  if (isLoading) {
    return <div className="loader mx-auto items-center mt-5"></div>;
  }

  if (error) {
    return <ErrorPage>{error.message}</ErrorPage>;
  }

  return (
    <>
      {isDetailOpen && (
        <DetailCompletePickupModal
          selectedRow={selectedRow}
          handleClose={handleClose}
          handleState={handleStateRow}
        />
      )}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-11 font-bold">
          Detail Penerimaan Penjemputan Sampah
        </h1>
        <p className="text-revamp-neutral-8 mt-1">
          Berikut adalah detail penjemputan sampah yang telah diterima oleh
          kurir.
        </p>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table columns={columns} data={filterMemo} />
          {isCancelled && (
            <CancelPickup
              pickupId={selectedRowId}
              courierId={users.courier_id}
              handleClose={handleClose}
              handleState={handleStateRow}
            />
          )}
        </div>
      </div>
    </>
  );
}
