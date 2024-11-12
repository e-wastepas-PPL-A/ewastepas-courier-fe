import { useState, useEffect } from "react";
import CardComponent from "../ProductCard/ProductCard";
import { getWasteLists, getWasteType } from "../../services";

const ElectronicDevices = (searchInput) => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [wasteLists, setWasteLists] = useState([]);
  const [pagination, setPagination] = useState({});
  const [wasteType, setWasteType] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.title = "Ewhale Courier | Electronic Devices";
    const fetchData = async () => {
      try {
        const [wasteListResponse, wasteTypeResponse] = await Promise.all([
          getWasteLists(pageNumber),
          getWasteType(),
        ]);

        setWasteLists(wasteListResponse.data.data);
        setWasteType(wasteTypeResponse.data.data);
        setPagination(wasteListResponse.data.pagination);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        // setError(error);
      }
    };

    fetchData();
  }, [pageNumber]);

  useEffect(() => {
    if (searchInput.searchInput) return setActiveFilter(0); // Reset active filter jika search input diisi
  }, [searchInput.searchInput]);

  const filterWaste = (category) => {
    let filteredWaste = wasteLists;
    let search = searchInput.searchInput;

    if (category !== 0) {
      filteredWaste = filteredWaste.filter(
        (w) => w.waste_type_id === parseInt(category)
      );
    }
    if (search) {
      filteredWaste = filteredWaste.filter((w) =>
        w.waste_name.toLowerCase().includes(search.toLowerCase())
      );
    }
    return filteredWaste;
  };

  const handlePagination = (page) => {
    setPageNumber(page);
  };

  return (
    <>
      {isLoading ? (
        <div className="loader mx-auto items-center"></div>
      ) : (
        <div className="min-h-fit mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row max-w-6xl mx-auto">
            {/* Filter Section */}
            <div className="flex flex-col gap-2 bg-white rounded-lg w-[300px] px-4">
              <h2 className="text-black-100 font-medium">Filter by:</h2>
              <div className="space-y-2 w-[220px]">
                <button
                  onClick={() => setActiveFilter(0)}
                  className={`${
                    activeFilter === 0 &&
                    "bg-revamp-secondary-400 text-revamp-neutral-2"
                  } w-full text-left px-3 py-2 rounded text-sm text-[#797979] transition-colors duration-200`}>
                  All
                </button>
                {wasteType.map((typeSelect, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveFilter(typeSelect.waste_type_id)}
                    className={`${
                      activeFilter === typeSelect.waste_type_id
                        ? "bg-revamp-secondary-400 text-revamp-neutral-2"
                        : "text-[#797979] hover:bg-[#F6F6F6]"
                    } w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200`}>
                    {typeSelect.waste_type_name.split("_").join(" ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Section */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-4">
              {filterWaste(activeFilter).map((waste) => (
                <CardComponent
                  key={waste.waste_id}
                  name={waste.waste_name}
                  image={waste.image}
                />
              ))}
              {filterWaste(activeFilter).length === 0 && (
                <div className="col-span-full text-center text-revamp-neutral-8">
                  Tidak ada sampah elektronik ditemukan
                </div>
              )}

              {/* Pagination */}
              <div className="col-span-full h-[40px] flex justify-center">
                {!searchInput.searchInput &&
                  [...Array(pagination.totalPages)].map((_, index) => {
                    const pageCount = index + 1;

                    return (
                      <button
                        key={index}
                        onClick={() => handlePagination(pageCount)}
                        className={`${
                          pageCount === pageNumber
                            ? "bg-revamp-secondary-400 text-white"
                            : "bg-white text-revamp-neutral-9"
                        } px-4 py-2 rounded-md mr-2`}>
                        {pageCount}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ElectronicDevices;
