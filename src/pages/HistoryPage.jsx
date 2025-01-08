import { useEffect, useState } from "react";
import Table from "../components/Tables/DataTable";
import { formatDate } from "../utils/date";
import { getHistoryCourier } from "../services";
import ErrorPage from "./Error/Error";
import { statusPickup } from "../utils/status";

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistoryCourier();
        if (response.status !== 200) {
          console.error(response.response.data.error);
          throw new Error(`${response.message}, see details in console`);
        }
        setHistory(response.data.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (isLoading) {
    return <div className="loader mx-auto items-center mt-5"></div>;
  }

  const columns = [
    {
      name: "Nama Customer",
      selector: (row) => row.community?.name ?? "-",
      sortable: true,
    },
    {
      name: "Alamat",
      selector: (row) => row.pickup_address,
      sortable: true,
    },
    {
      name: "Tanggal Permintaan",
      selector: (row) => formatDate(row.pickup_date),
      sortable: true,
      sortFunction: (a, b) => new Date(a.pickup_date) - new Date(b.pickup_date),
    },
    {
      name: "Kategori",
      selector: (row) => row.wasteDetails[0]?.wasteName ?? "-",
      sortable: true,
    },
    {
      name: "Total Sampah",
      selector: (row) => row.wasteDetails[0]?.quantity ?? "-",
    },
    {
      name: "Drop Box",
      selector: (row) => row.dropbox.name,
      sortable: true,
    },
    {
      name: "Courier",
      selector: (row) => row.courier.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span className="font-bold bg-revamp-neutral-5 px-6 py-1 rounded-md">
          {statusPickup(row.pickup_status)}
        </span>
      ),
      sortable: true,
    },
  ];

  const filteredHistory = history.filter((item) => {
    const matchesSearchTerm =
      item.community?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.wasteDetails[0]?.wasteName
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesStatus =
      item.pickup_status === "Sampah_telah_dijemput" ||
      item.pickup_status === "Penjemputan_Gagal";
    return matchesSearchTerm && matchesStatus;
  });

  if (error) {
    return <ErrorPage>{error.message}</ErrorPage>;
  }

  return (
    <>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-11 font-bold">
          Detail History Penjemputan Sampah
        </h1>
        <p className="text-revamp-neutral-8 mt-1">
          Berikut adalah list riwayat penjemputan sampah yang telah dilakukan
          oleh kurir.
        </p>
        <div className="mt-4 border rounded-md border-revamp-neutral-6">
          <input
            type="text"
            placeholder="Cari berdasarkan nama customer"
            className="border-0 rounded-md p-2 w-full"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table
            columns={columns}
            data={filteredHistory}
            emptyData={"Tidak ada riwayat penjemputan sampah"}
            highlightOnHover
            pagination
          />
        </div>
      </div>
    </>
  );
}
