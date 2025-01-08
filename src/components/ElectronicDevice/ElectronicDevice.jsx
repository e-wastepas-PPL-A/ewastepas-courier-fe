/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from "react";
import CardComponent from "../ProductCard/ProductCard";
import {
  getWasteById,
  getWasteLists,
  getWasteType,
  searchWaste,
} from "../../services";

const ElectronicDevices = ({ searchInput, clearInput }) => {
  const [activeFilter, setActiveFilter] = useState(0);
  const [wasteLists, setWasteLists] = useState([]);
  const [pagination, setPagination] = useState({});
  const [wasteType, setWasteType] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [filterCategory, setFilterCategory] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Ewhale Courier | Electronic Devices";
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [wasteListResponse, wasteTypeResponse] = await Promise.all([
          getWasteLists(pageNumber),
          getWasteType(),
        ]);

        if (wasteListResponse.status !== 200) {
          setIsLoading(false);
          console.error(wasteListResponse.response.data.message);
          throw new Error(
            `${wasteListResponse.message}, see details in console`
          );
        }

        setWasteLists(wasteListResponse.data.data.items);
        setWasteType(wasteTypeResponse.data.data);
        setPagination(wasteListResponse.data.data.pagination);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
  }, [pageNumber]);

  const searchInputWaste = async (search) => {
    try {
      const response = await searchWaste(search);
      if (response.status === 404) {
        console.error(response.response.data.message);
        throw new Error(`${response.message}, see details in console`);
      }
      setSearchResult(response.data.data);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    // Debounce untuk menghindari request yang berlebihan
    // Debounce menggunakan async agar proses bisa berhenti jika ada input baru
    const delayDebounceFn = setTimeout(async () => {
      setSearchResult([]);
      await searchInputWaste(searchInput);
      setLoading(false);
    }, 600);

    return () => clearTimeout(delayDebounceFn);
  }, [searchInput]);

  useEffect(() => {
    if (searchInput) setActiveFilter(0);
  }, [searchInput]);

  // Filter waste berdasarkan filter yang active dipilih user atau search input
  const filterWaste = useMemo(() => {
    // Jika sedang loading, return undefined
    if (loading) {
      return undefined;
    }

    // Jika ada search input dan hasil search
    if (searchInput.length > 0) {
      return searchResult;
    }

    // Jika tidak ada search, gunakan filter biasa
    if (activeFilter === 0) {
      return wasteLists;
    }

    // Jika filter dipilih, gunakan filter berdasarkan kategori
    if (filterCategory) return filterCategory;
  }, [
    wasteLists,
    activeFilter,
    searchInput,
    filterCategory,
    searchResult,
    loading,
  ]);

  const categoryWaste = async (a) => {
    try {
      setLoading(true);
      const response = await getWasteById(a);
      if (response.status !== 200) {
        console.error(response.response.data.message);
        throw new Error(`${response.message}, see details in console`);
      }
      setFilterCategory(response.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handlePagination = (page) => {
    setPageNumber(page);
  };

  if (error) {
    <p className="text-center">{error.message}</p>;
  }

  return (
    <>
      {isLoading ? (
        <div className="loader mx-auto flex items-center justify-center"></div>
      ) : (
        <div className="min-h-fit mb-8 max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row max-w-6xl mx-auto">
            {/* Filter Section */}
            <div className="flex flex-col gap-2 bg-white rounded-lg w-full md:w-[300px] px-4 pb-4">
              <div className="space-y-2 w-full md:w-[220px]">
                <h2 className="text-black-100 font-medium">Filter by:</h2>
                <button
                  onClick={() => setActiveFilter(0)}
                  className={`${
                    activeFilter === 0 &&
                    "bg-revamp-secondary-400 text-revamp-neutral-2"
                  } w-full text-left px-3 py-2 rounded text-sm text-[#797979] transition-colors duration-200`}>
                  All
                </button>
                {
                  <>
                    {wasteType.map((typeSelect, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setActiveFilter(typeSelect.waste_type_id);
                          categoryWaste(typeSelect.waste_type_id);
                          clearInput("");
                        }}
                        className={`${
                          activeFilter === typeSelect.waste_type_id
                            ? "bg-revamp-secondary-400 text-revamp-neutral-2"
                            : "text-[#797979] hover:bg-[#F6F6F6]"
                        } w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200`}>
                        {typeSelect.waste_type_name.split("_").join(" ")}
                      </button>
                    ))}
                  </>
                }
              </div>
            </div>

            {/* Card Section */}
            <div className="flex flex-col mx-auto">
              {loading ? (
                <div className="loader mx-auto flex items-center justify-center m-4"></div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 grid-rows-2 gap-4">
                  {filterWaste.map((waste) => (
                    <CardComponent
                      key={waste.waste_id}
                      name={waste.waste_name}
                      image={waste.image}
                    />
                  ))}

                  {filterWaste.length === 0 && (
                    <div className="col-span-full text-center text-revamp-neutral-8">
                      Tidak ada sampah elektronik
                    </div>
                  )}
                </div>
              )}

              {/* Pagination */}
              <div className="col-span-full h-[40px] flex justify-center mt-4">
                {!searchInput &&
                  activeFilter === 0 &&
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
