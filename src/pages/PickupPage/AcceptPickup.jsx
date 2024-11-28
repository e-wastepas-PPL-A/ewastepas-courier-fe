import { useEffect, useState } from "react";
import Table from "../../components/Tables/DataTable";
import { getAllPickup } from "../../services";
import { formatDate } from "../../utils/date";

// const data = [
//   {
//     nama: "Muhammad Ardhan",
//     tanggal: "10 Oktober 2024",
//     alamat: "Jl. Durian, Runtuh No. 32",
//     kategori: "Peralatan IT",
//     total_sampah: 15,
//     status: <span className="font-bold">Dalam Perjalanan</span>,
//   },
//   {
//     nama: "Devan Wiyata Putra",
//     tanggal: "12 Oktober 2024",
//     alamat: "Jl. Durian, Runtuh No. 22",
//     kategori: "Layar & Monitor",
//     total_sampah: 8,
//     status: <span className="font-bold">Menunggu</span>,
//   },
// ];

export default function AcceptPickupPage() {
  const [pickup, setPickup] = useState([]);

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
      name: "Status",
      selector: (row) => row.pickup_status,
    },
    {
      name: "Action",
      cell: () => <button className="text-xl">...</button>,
    },
  ];

  useEffect(() => {
    const fetchPickup = async () => {
      const response = await getAllPickup();
      setPickup(response.data.data);
    };
    fetchPickup();
  }, []);

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Detail Penerimaan Penjemputan Sampah
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table columns={columns} data={pickup} />
        </div>
      </div>
    </>
  );
}
