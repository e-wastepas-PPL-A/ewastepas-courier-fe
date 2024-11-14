import { useEffect, useState } from "react";
import Table from "../components/Tables/DataTable";
import { formatDate } from "../utils/date";
import { getHistoryCourier } from "../services";

export default function HistoryPage() {
  const [error, setError] = useState(null);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("users"));
    const fetchHistory = async () => {
      try {
        const response = await getHistoryCourier(user.courier_id);
        setHistory(response.data.data);
      } catch (error) {
        setError(error);
      }
    };
    fetchHistory();
  }, []);

  console.log(history);

  const columns = [
    {
      name: "Nama Customer",
      selector: (row) => row.namaCustomer, // kosong
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
    },
    {
      name: "Kategori",
      selector: (row) => row.kategori, // kosong
      sortable: true,
    },
    {
      name: "Total Sampah",
      selector: (row) => row.totalSampah, // kosong
      sortable: true,
    },
    {
      name: "Drop Box",
      selector: (row) => row.dropbox.name,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      cell: (row) => (
        <span className="font-bold bg-revamp-neutral-5 px-6 py-1 rounded-xl">
          {row.pickup_status}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <>
      {error && <p>{error.message}</p>}
      <div className="container mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Detail History Penjemputan Sampah
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table columns={columns} data={history} highlightOnHover pagination />
        </div>
      </div>
    </>
  );
}
