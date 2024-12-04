import { useEffect, useState } from "react";
import Table from "../components/Tables/DataTable";
import { formatDate } from "../utils/date";
import { getHistoryCourier } from "../services";

export default function HistoryPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await getHistoryCourier();
        setHistory(response.data.data);
        setIsLoading(false);
      } catch (e) {
        console.log(e);
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
      selector: (row) => row.community.name,
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
        <span className="font-bold bg-revamp-neutral-5 px-6 py-1 rounded-md">
          {row.pickup_status}
        </span>
      ),
      sortable: true,
    },
  ];

  return (
    <>
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
