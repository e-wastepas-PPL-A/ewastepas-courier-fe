import Table from "../../components/Tables/DataTable";

const columns = [
  {
    name: "Nama Customer",
    selector: (row) => row.nama,
  },
  {
    name: "Tanggal",
    selector: (row) => row.tanggal,
  },
  {
    name: "Alamat",
    selector: (row) => row.alamat,
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
    selector: (row) => row.status,
  },
  {
    name: "Action",
    cell: () => <button className="text-xl">...</button>,
  },
];

const data = [
  {
    nama: "Muhammad Ardhan",
    tanggal: "10 Oktober 2024",
    alamat: "Jl. Durian, Runtuh No. 32",
    kategori: "Peralatan IT",
    total_sampah: 15,
    status: <span className="font-bold">Dalam Perjalanan</span>,
  },
  {
    nama: "Devan Wiyata Putra",
    tanggal: "12 Oktober 2024",
    alamat: "Jl. Durian, Runtuh No. 22",
    kategori: "Layar & Monitor",
    total_sampah: 8,
    status: <span className="font-bold">Menunggu</span>,
  },
];

export default function AcceptPickupPage() {
  return (
    <>
      <div className="container-sm mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Detail Penerimaan Penjemputan Sampah
        </h1>
        <div className="mt-4 rounded-md border p-4 border-revamp-neutral-6">
          <Table columns={columns} data={data} />
        </div>
      </div>
    </>
  );
}
