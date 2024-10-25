import {
  Search,
  Monitor,
  Smartphone,
  CookingPot,
  Cpu,
  Stethoscope,
  Guitar,
} from "lucide-react";
import Graphic1 from "../assets/graphic-1.png";
import CategoryCard from "../components/CategoryCard/CategoryCard";
import Navbar from "../components/Navbar/Navbar";
import ElectronicDevices from "../components/ElectronicDevice/ElectronicDevice";

const categoryLists = [
  {
    icon: <Monitor />,
    title: "Elektronik Besar",
  },
  {
    icon: <Smartphone />,
    title: "Elektronik Kecil",
  },
  {
    icon: <CookingPot />,
    title: "Elektronik Dapur",
  },
  {
    icon: <Cpu />,
    title: "Telekomunikasi & IT",
  },
  {
    icon: <Stethoscope />,
    title: "Elektronik Medis",
  },
  {
    icon: <Guitar />,
    title: "Elektronik Hiburan",
  },
];

export default function CategoryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-50">
      <Navbar />
      {/* Hero Section */}
      <div className="relative px-24 py-16 md:py-8">
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
        <h3 className="text-2xl font-bold text-revamp-secondary-600 mb-4 text-center">
          Kategori
        </h3>
        <hr className="border border-revamp-neutral-7/20 my-4" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categoryLists.map((category, index) => (
            <CategoryCard
              key={index}
              icon={category.icon}
              title={category.title}
              className={"bg-revamp-secondary-400 w-full"}
            />
          ))}
        </div>
        {/* Sampah Elektronik Section */}
        <h3 className="text-2xl font-bold text-revamp-secondary-600 mt-16 mb-4 text-center">
          Sampah Elektronik
        </h3>
        <hr className="border border-revamp-neutral-7/20 my-4" />
        <ElectronicDevices />
      </div>
    </div>
  );
}
