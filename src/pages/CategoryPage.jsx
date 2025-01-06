import { Search } from "lucide-react";
import Graphic1 from "../assets/graphic-1.png";
import ElectronicDevices from "../components/ElectronicDevice/ElectronicDevice";
import { useState } from "react";

export default function CategoryPage() {
  const [searchInput, setSearchInput] = useState("");

  // const handleSearch = (search) => {
  //   setSearchInput(search);
  //   console.log("skaodksd");
  // };
  return (
    <>
      <div className="container-sm min-h-screen lg:max-w-[1000px] mx-auto px-4 sm:w-screen">
        {/* Hero Section */}
        <div className="relative py-16 md:py-8">
          {/* Content */}
          <div className="flex flex-row w-fit max-w-4xl mx-auto relative px-8 py-6 bg-revamp-secondary-400 rounded-xl text-white">
            <div className="flex flex-col">
              <h2 className="text-4xl md:text-3xl font-bold text-primary-700 mb-4">
                Temukan Ragam <br />
                Kategori & Jenis
                <br />
                Sampah Elektronik
              </h2>
              <p className="text-revamp-neutral-5 mb-8 max-w-lg">
                Eksplorasi Jenis dan Kategori Sampah Elektronik, untuk
                Lingkungan yang Lebih Bersih
              </p>

              {/* Search Bar */}
              <div className="relative max-w-xl">
                <form
                  action=""
                  className="relative"
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}>
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-revamp-neutral-10 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search here..."
                    className="w-full px-4 py-3 pl-12 rounded-lg  text-revamp-neutral-10 border-revamp-neutral-10 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </form>
              </div>
            </div>
            <img src={Graphic1} className="mx-4 w-[300px] hidden sm:block" />
          </div>
        </div>

        {/* Categories Section */}
        <div className="max-w-4xl mx-auto">
          {/* Sampah Elektronik Section */}
          <h3 className="text-2xl font-bold text-revamp-secondary-600 mt-16 mb-4 text-center">
            Sampah Elektronik
          </h3>
          <hr className="border border-revamp-neutral-7/20 my-4" />
          <ElectronicDevices searchInput={searchInput} />
        </div>
      </div>
    </>
  );
}
