import { useEffect, useState } from "react";
import Table from "../../components/Tables/DataTable";
import { getAllPickup } from "../../services";
import { formatDate } from "../../utils/date";
import { EyeIcon } from "lucide-react";

// const data = [
//   {
//     nama: "Fizi Ramdhani Putra",
//     tanggal: "10 Oktober 2024",
//     alamat: "Jl. Durian, Runtuh No. 32",
//     kategori: "Peralatan IT",
//     total_sampah: 15,
//     action: "...",
//   },
//   {
//     nama: "Mail Prasetyo Isukmijan",
//     tanggal: "12 Oktober 2024",
//     alamat: "Jl. Durian, Runtuh No. 22",
//     kategori: "Layar & Monitor",
//     total_sampah: 8,
//     action: "...",
//   },
// ];

export default function RequestPickupPage() {
  const [pickup, setPickup] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPickup = async () => {
      try {
        const response = await getAllPickup();
        setPickup(response.data.data);
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
      selector: (row) => row.kategori,
    },
    {
      name: "Total Sampah",
      selector: (row) => row.total_sampah,
    },
    {
      name: "Action",
      cell: (row) => (
        <button
          className="text-xl cursor-pointer"
          onClick={() => alert(row.dropbox_id)}>
          <EyeIcon color="#005b96" />
        </button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl text-revamp-neutral-8 font-medium">
        Detail Permintaan Penjemputan Sampah
      </h1>
      <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
        <Table columns={columns} data={pickup} />
      </div>
    </div>
  );
}
