/* eslint-disable react/prop-types */
import DataTable from "react-data-table-component";

const customStyles = {
  headCells: {
    style: {
      fontSize: "14px",
      color: "#ffffff",
      backgroundColor: "#42A444",
    },
  },
  rows: {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  },
};

const Table = ({ columns, data }) => {
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
