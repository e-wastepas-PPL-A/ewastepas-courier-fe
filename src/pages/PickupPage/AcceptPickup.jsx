import { useEffect, useState } from "react";
import Table from "../../components/Tables/DataTable";
import { getAllPickup } from "../../services";
import { formatDate } from "../../utils/date";
import { EyeIcon, XIcon } from "lucide-react";
import { useCourier } from "../../stores/courier";
import CancelPickup from "../../components/Modal/CancelPickup";

export default function AcceptPickupPage() {
  const users = useCourier((state) => state.userDummy);
  const [pickup, setPickup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [isCancelled, setIsCancelled] = useState(false);

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
      name: "Total Sampah",
      selector: (row) => row.wasteDetails[0]?.quantity,
    },
    {
      name: "Kategori",
      selector: (row) => row.wasteDetails[0]?.wasteName,
    },
    {
      name: "Status",
      selector: (row) => row.pickup_status,
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
            onClick={() => alert(row.pickup_id)}>
            <EyeIcon color="#005b96" />
          </button>
        </div>
      ),
    },
  ];

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
    return data.filter(
      (p) => p.pickup_status === "accepted" && p.courier?.name === users.name
    );
  };

  const handleAction = (id) => {
    setSelectedRowId(id);
    setIsCancelled(!isCancelled);
  };

  const handleClose = () => {
    setIsCancelled(false);
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Detail Penerimaan Penjemputan Sampah
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table columns={columns} data={handleFilter(pickup)} />
        </div>
        {isCancelled && (
          <CancelPickup
            pickupId={selectedRowId}
            courierId={users.courier_id}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
}
