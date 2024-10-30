import {
  BarChart,
  Bar,
  ResponsiveContainer,
  YAxis,
  XAxis,
  Tooltip,
  Rectangle,
  CartesianGrid,
} from "recharts";
import Navbar from "../components/Navbar/Navbar";
import StatisticCard from "../components/StatisticCard/StatisticCard";
import { ChevronDown } from "lucide-react";
import { totalDelivery } from "../services/dummy";

const Chart = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={totalDelivery}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 20,
        }}>
        <CartesianGrid verticalCoordinatesGenerator={500} />
        <YAxis
          dataKey="total"
          domain={[0, 80]}
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80]}
          label={{
            value: "Total Deliveries",
            angle: -90,
            position: "insideLeft",
          }}
        />
        <XAxis
          dataKey="month"
          label={{
            value: "Month",
            position: "bottom",
          }}
        />
        <Tooltip />
        <Bar
          dataKey="total"
          fill="#337cab"
          activeBar={<Rectangle stroke="#005389" />}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default function DashboardPage() {
  return (
    <>
      {/* Navbar */}
      <Navbar />
      <div className="container-sm lg:max-w-[1000px] mx-auto px-4 sm:w-screen">
        {/* Outer Card */}
        <div className="flex flex-col lg:flex-row mx-auto my-8 gap-4 justify-center items-center lg:w-full">
          <StatisticCard title="Total Delivered" value="100" />
          <StatisticCard title="On Delivery" value="25" />
          <StatisticCard title="Canceled Delivery" value="25" />
          <StatisticCard title="Total Point" value="100" />
        </div>

        {/* Barchart Section */}
        <div className="border border-revamp-neutral-10/20 rounded-lg  max-w-[1000px] px-2 py-6 mx-auto mb-8">
          <div className="flex flex-row justify-between items-center py-2 mx-14">
            <span className="text-md font-bold text-revamp-neutral-10">
              Analysis Total Delivery
            </span>
            <div className="flex flex-row gap-x-2">
              <button className="flex flex-row gap-x-2 bg-revamp-secondary-400 text-white p-2 rounded-md text-sm">
                This year
                <ChevronDown size={20} />
              </button>
            </div>
          </div>
          <Chart />
        </div>
      </div>
    </>
  );
}
