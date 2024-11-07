import Table from "../components/Tables/DataTable";
const columns = [
  {
    name: "Nama Drop Box",
    selector: (row) => row.namaDropBox,
    sortable: true,
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Kapasitas",
    selector: (row) => row.kapasitas,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-2 py-1 rounded ${
          row.status === "Tersedia"
            ? "bg-green-200 text-green-800"
            : "bg-red-200 text-red-800"
        }`}>
        {row.status}
      </span>
    ),
    sortable: true,
  },
  {
    name: "Jam Operasional",
    selector: (row) => row.jamOperasional,
    sortable: true,
  },
  {
    name: "Action",
    cell: () => <button className="text-xl">...</button>,
  },
];

const data = [
  {
    id: 1,
    namaDropBox: "Plaza Hijau",
    alamat: "Jl. Raya Hijau No. 10",
    kapasitas: 500,
    status: <span className="font-bold">Tersedia</span>,
    jamOperasional: "08:00-20:00",
  },
  {
    id: 2,
    namaDropBox: "Taman Digital",
    alamat: "Jl. Teknologi No. 15",
    kapasitas: 600,
    status: <span className="font-bold">Penuh</span>,
    jamOperasional: "08:00-20:00",
  },
];

export default function HistoryPage() {
  return (
    <div className="container-sm mx-auto p-4">
      <h1 className="text-2xl text-revamp-neutral-8 font-medium">
        Detail Lokasi Dropbox
      </h1>
      <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
        <Table columns={columns} data={data} highlightOnHover pagination />
      </div>
    </div>
  );
}
