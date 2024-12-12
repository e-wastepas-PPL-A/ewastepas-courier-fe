import { useEffect, useState } from "react";
import Table from "../../components/Tables/DataTable";
import { getAllPickup } from "../../services";
import { formatDate } from "../../utils/date";
import { CheckIcon, EyeIcon } from "lucide-react";
import RequestPickupModal from "../../components/Modal/RequestPickup";
import ConfirmPickup from "../../components/Modal/ConfirmPickup";
import { useCourier } from "../../stores/courier";

export default function RequestPickupPage() {
  const users = useCourier((state) => state.userDummy);
  const [pickup, setPickup] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAccepted, setIsAccepted] = useState(false);

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const response = await getAllPickup();
        const data = response.data.data;
        setPickup(data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
      }
    };
    fetchPickup();
  }, []);

  if (isLoading) {
    return <div className="loader mx-auto items-center mt-5"></div>;
  }

  const handleFilter = (data) => {
    return data.filter((p) => p.pickup_status === "requested");
  };

  const columns = [
    {
      name: "Nama Customer",
      selector: (row) => row.community.name,
    },
    {
      name: "Tanggal",
      selector: (row) => formatDate(row.pickup_date),
    },
    {
      name: "Alamat",
      selector: (row) => row.pickup_address,
    },
    {
      name: "Kategori",
      selector: (row) => row.wasteDetails[0]?.wasteName,
    },
    {
      name: "Total Sampah",
      selector: (row) => row.wasteDetails[0]?.quantity,
    },
    {
      name: "Action",
      cell: (row) => (
        <div className="flex flex-row gap-2">
          <button onClick={() => handleAction(row.pickup_id, "accept")}>
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

  const handleAction = (id) => {
    setSelectedRowId(id);
    setIsAccepted(!isAccepted);
  };

  const handleOpen = (row) => {
    setSelectedRow(row);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedRow(null);
    setIsAccepted(false);
  };

  return (
    <>
      {isOpen && (
        <RequestPickupModal
          selectedRow={selectedRow}
          handleClose={handleClose}
        />
      )}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Detail Permintaan Penjemputan Sampah
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table columns={columns} data={handleFilter(pickup)} />
          {isAccepted && (
            <ConfirmPickup
              pickupId={selectedRowId}
              courierId={users.courier_id}
              handleClose={handleClose}
            />
          )}
        </div>
      </div>
    </>
  );
}
