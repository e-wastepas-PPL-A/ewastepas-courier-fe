/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";

const columns = [
  {
    name: "Pick Up ID",
    selector: (row) => row.pickup_id,
    sortable: true,
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
    cell: (row) => row.action,
  },
];

const Pills = (status) => {
  switch (status) {
    case "Completed":
      return (
        <PillColor
          className="bg-revamp-success-500 text-white"
          status="Completed"
        />
      );
    case "On Delivery":
      return (
        <PillColor
          className="bg-revamp-warning-500 text-white"
          status="On Delivery"
        />
      );
    case "Pending":
      return (
        <PillColor
          className="bg-revamp-secondary-500 text-white"
          status="Pending"
        />
      );
    case "Canceled":
      return (
        <PillColor
          className="bg-revamp-error-500 text-white"
          status="Canceled"
        />
      );
    default:
      return (
        <PillColor className="bg-revamp-secondary-500 text-white" status="-" />
      );
  }
};

const PillColor = ({ className, status }) => (
  <span
    className={`py-1 px-2 shadow-md no-underline rounded-full bg-blue font-sans font-semibold text-sm btn-primary focus:outline-none active:shadow-none mr-2 ${className}`}>
    {status}
  </span>
);

const data = [
  {
    pickup_id: "AKN1258",
    tanggal: "8-12-2021",
    alamat: "Jl. Durian, Runtuh No. 21",
    kategori: "Elektronik Besar",
    total_sampah: 15,
    status: Pills("On Delivery"),
    action: "...",
  },
  {
    pickup_id: "SRT2123",
    tanggal: "10-12-2021",
    alamat: "Jl. Durian, Runtuh No. 22",
    kategori: "Elektronik Kecil",
    total_sampah: 8,
    status: Pills("Completed"),
    action: "...",
  },
  {
    pickup_id: "AKN1258",
    tanggal: "8-12-2021",
    alamat: "Jl. Durian, Runtuh No. 21",
    kategori: "Elektronik Besar",
    total_sampah: 15,
    status: Pills("On Delivery"),
    action: "...",
  },
  {
    pickup_id: "TML3032",
    tanggal: "12-12-2021",
    alamat: "Jl. Durian, Runtuh No. 23",
    kategori: "Elektronik Kecil, Elektronik Dapur",
    total_sampah: 18,
    status: Pills("Pending"),
    action: "...",
  },
];

const customStyles = {
  headCells: {
    style: {
      fontSize: "16px",
      color: "#ffffff",
      backgroundColor: "#308A71",
    },
  },
};

const Table = () => {
  return (
    <DataTable
      columns={columns}
      data={data}
      customStyles={customStyles}
      pagination
    />
  );
};

export default Table;
