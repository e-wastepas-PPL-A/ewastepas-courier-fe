import { useState } from "react";
import CardComponent from "../ProductCard/Card";
import Television from "../../assets/ewaste-devices/television.png";
import Kulkas from "../../assets/ewaste-devices/kulkas.png";
import MesinCuci from "../../assets/ewaste-devices/mesincuci.png";
import Oven from "../../assets/ewaste-devices/oven.png";
import ACImg from "../../assets/ewaste-devices/ac.png";
import Setrika from "../../assets/ewaste-devices/setrika.png";
import Blender from "../../assets/ewaste-devices/blender.png";
import Smartphone from "../../assets/ewaste-devices/smartphone.png";
import Router from "../../assets/ewaste-devices/router.png";
import Keyboard from "../../assets/ewaste-devices/keyboard.png";
import Laptop from "../../assets/ewaste-devices/laptop.png";
import Radio from "../../assets/ewaste-devices/radio.png";

const ElectronicDevices = () => {
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = [
    "All",
    "Elektronik Besar",
    "Elektronik Kecil",
    "Elektronik Dapur",
    "Telekomunikasi & IT",
    "Elektronik Medis",
    "Elektronik Hiburan",
  ];

  const devices = [
    {
      name: "Televisi",
      image: Television,
    },
    {
      name: "Kulkas",
      image: Kulkas,
    },
    {
      name: "Mesin Cuci",
      image: MesinCuci,
    },
    {
      name: "Oven",
      image: Oven,
    },
    {
      name: "AC",
      image: ACImg,
    },
    {
      name: "Setrika",
      image: Setrika,
    },
    {
      name: "Blender",
      image: Blender,
    },
    {
      name: "Smartphone",
      image: Smartphone,
    },
    {
      name: "Router",
      image: Router,
    },
    {
      name: "Keyboard",
      image: Keyboard,
    },
    {
      name: "Laptop",
      image: Laptop,
    },
    {
      name: "Radio",
      image: Radio,
    },
  ];

  return (
    <div className="min-h-fit mb-8 max-w-4xl mx-auto">
      <div className="flex flex-row max-w-6xl mx-auto">
        {/* Filter Section */}
        <div className="flex flex-col gap-2 bg-white rounded-lg w-[300px] p-4">
          <h2 className="text-black-100 font-medium">Filter by:</h2>
          <div className="space-y-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`${
                  activeFilter === category
                    ? "bg-revamp-neutral-4 text-[#6D6D6D]"
                    : "text-[#797979] hover:bg-[#F6F6F6]"
                } w-full text-left px-3 py-2 rounded text-sm transition-colors duration-200`}>
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Card Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {devices.map((device, index) => (
            <CardComponent
              key={index}
              name={device.name}
              image={device.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ElectronicDevices;
