import StatisticCard from "../components/StatisticCard/StatisticCard";
import { ChevronDown } from "lucide-react";
import Chart from "../components/BarChart/BarChart";
import { useEffect, useState } from "react";
import { getTotalCourier } from "../services";
import { useCourier } from "../stores/courier";

export default function DashboardPage() {
  const user = useCourier((state) => state.userDummy);
  const [todayTotals, setTodayTotals] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("users")) {
      localStorage.setItem("users", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    const fetchCourierStatistic = async () => {
      const response = await getTotalCourier(user.courier_id);
      setTodayTotals(response.data.todayTotals);
      setMonthlyTotals(response.data.monthlyTotals);
    };
    fetchCourierStatistic();
  }, [user]);

  return (
    <>
      {/* Navbar */}
      <div className="container-sm lg:max-w-[1000px] mx-auto px-4 sm:w-screen">
        {/* Outer Card */}
        <div className="flex flex-col lg:flex-row mx-auto my-8 gap-4 justify-center items-center lg:w-full">
          {Object.keys(todayTotals).map((key, index) => (
            <StatisticCard key={index} title={key} value={todayTotals[key]} />
          ))}
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
          <Chart data={monthlyTotals} />
        </div>
      </div>
    </>
  );
}
