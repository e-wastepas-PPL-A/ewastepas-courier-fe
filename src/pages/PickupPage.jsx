import { useState } from "react";
import Table from "../components/Tables/DataTable";

export default function PickupPage() {
  const [filter, setFilter] = useState("All");

  const filterList = [
    {
      id: 1,
      name: "All",
    },
    {
      id: 2,
      name: "Completed",
    },
    {
      id: 3,
      name: "On Delivery",
    },
    {
      id: 4,
      name: "Canceled",
    },
  ];

  return (
    <>
      <div className="container-sm mx-auto p-4">
        <h1 className="text-2xl text-revamp-neutral-8 font-medium">
          Detail Penjemputan Sampah
        </h1>
        <div className="flex mt-4 border-2 border-revamp-neutral-6 rounded w-fit">
          {filterList.map((item) => (
            <button
              key={item.id}
              className={`px-3 py-2 text-sm cursor-pointer transition-colors duration-200 border-0 ${
                filter === item.name
                  ? "bg-revamp-secondary-500 text-white border-l-0 rounded-sm"
                  : "bg-white border text-revamp-secondary-500"
              }`}
              onClick={() => setFilter(item.name)}>
              {item.name}
            </button>
          ))}
        </div>
        <div className="mt-4 rounded-md">
          <Table />
        </div>
      </div>
    </>
  );
}
