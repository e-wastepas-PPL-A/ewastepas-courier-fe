/* eslint-disable react/prop-types */
import { Search, Monitor, Smartphone, CookingPot, Cpu } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import Graphic1 from "../assets/graphic-1.png";

const EWasteCategories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-50">
      {/* Hero Section */}
      <div className="relative px-24 py-16 md:py-16">
        {/* Content */}
        <div className="flex flex-row w-fit max-w-4xl mx-auto relative px-8 py-6 bg-revamp-secondary-600 rounded-xl text-white">
          <div className="flex flex-col">
            <h2 className="text-4xl md:text-3xl font-bold text-primary-700 mb-4">
              Temukan Ragam <br />
              Kategori & Jenis
              <br />
              Sampah Elektronik
            </h2>
            <p className="text-revamp-neutral-5 mb-8 max-w-lg">
              Eksplorasi Jenis dan Kategori Sampah Elektronik, untuk Lingkungan
              yang Lebih Bersih
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-revamp-neutral-10 w-5 h-5" />
              <input
                type="text"
                placeholder="Search here..."
                className="w-full px-4 py-3 pl-12 rounded-lg  text-revamp-neutral-10 border-revamp-neutral-10 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
              />
            </div>
          </div>
          <img src={Graphic1} className="mx-4 w-[300px]" />
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-revamp-secondary-600 mb-8 text-center">
          Kategori
        </h3>

        <div className="relative">
          <Swiper spaceBetween={30} slidesPerView={3}>
            <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
              <SwiperSlide>
                <CategoryCard
                  icon={<Monitor />}
                  title="Elektronik Besar"
                  className="bg-revamp-secondary-500"
                />
              </SwiperSlide>
              <SwiperSlide>
                <CategoryCard
                  icon={<Smartphone />}
                  title="Elektronik Kecil"
                  className="bg-revamp-secondary-500"
                />
              </SwiperSlide>
              <SwiperSlide>
                <CategoryCard
                  icon={<CookingPot />}
                  title="Elektronik Dapur"
                  className="bg-revamp-secondary-500"
                />
              </SwiperSlide>
              <SwiperSlide>
                <CategoryCard
                  icon={<Cpu />}
                  title="Telekomunikasi & IT"
                  className="bg-revamp-secondary-500"
                />
              </SwiperSlide>
              <SwiperSlide>
                <CategoryCard
                  icon={<Cpu />}
                  title="Elektronik Medis"
                  className="bg-revamp-secondary-500"
                />
              </SwiperSlide>
            </div>

            <div className="absolute right-0 top-0 bottom-4 w-16 bg-gradient-to-l from-primary-50 pointer-events-none" />
          </Swiper>
        </div>
      </div>
    </div>
  );
};

const CategoryCard = ({ icon, title, className }) => {
  return (
    <div
      className={`flex items-center gap-3 min-w-[200px] p-4 rounded-lg shadow-lg hover:shadow-md hover:bg-revamp-secondary-600 transition-all text-white cursor-pointer ${className}`}>
      <div className="p-2 rounded-lg bg-primary-50 ">{icon}</div>
      <span className="text-sm font-medium ">{title}</span>
    </div>
  );
};

export default function CategoryPage() {
  return <EWasteCategories />;
}
