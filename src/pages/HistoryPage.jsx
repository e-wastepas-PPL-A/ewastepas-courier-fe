import Pill from "../components/Pills/Pill";
import Table from "../components/Tables/DataTable";
const columns = [
  {
    name: "Nama Customer",
    selector: (row) => row.namaCustomer,
    sortable: true,
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
    sortable: true,
  },
  {
    name: "Tanggal Permintaan",
    selector: (row) => row.tanggalPermintaan,
    sortable: true,
  },
  {
    name: "Kategori",
    selector: (row) => row.kategori,
    sortable: true,
  },
  {
    name: "Total Sampah",
    selector: (row) => row.totalSampah,
    sortable: true,
  },
  {
    name: "Drop Box",
    selector: (row) => row.dropBox,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    cell: (row) => <Pill status="success" label={row.status} />,
    sortable: true,
  },
];

const data = [
  {
    id: 1,
    namaCustomer: "Fizi",
    alamat: "Lorem",
    tanggalPermintaan: "10-Oktober-2024",
    kategori: "Peralatan IT",
    totalSampah: 8,
    dropBox: "Lorem Ipsum",
    status: "Selesai",
  },
  {
    id: 2,
    namaCustomer: "Ehsan",
    alamat: "Lorem",
    tanggalPermintaan: "14-Oktober-2024",
    kategori: "Mainan Elektronik",
    totalSampah: 10,
    dropBox: "Lorem Ipsum",
    status: <span className="font-bold">Gagal</span>,
  },
];

export default function HistoryPage() {
  return (
    <div className="container-sm mx-auto p-4">
      <h1 className="text-2xl text-revamp-neutral-8 font-medium">
        Detail History Penjemputan Sampah
      </h1>
      <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
        <Table columns={columns} data={data} highlightOnHover pagination />
      </div>
    </div>
  );
}
