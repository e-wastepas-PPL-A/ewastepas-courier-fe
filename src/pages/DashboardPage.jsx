import StatisticWrapper from "../components/StatisticWrapper/StatisticWrapper";
import Chart from "../components/BarChart/BarChart";
import { useEffect, useState } from "react";
import { getTotalCourier } from "../services";
import { useCourier } from "../stores/courier";
import ErrorPage from "./Error/Error";

export default function DashboardPage() {
  const user = useCourier((state) => state.user);
  const [todayTotals, setTodayTotals] = useState([]);
  const [monthlyTotals, setMonthlyTotals] = useState([]);
  const [weeklyTotals, setWeeklyTotals] = useState([]);
  const [yearlyTotals, setYearlyTotals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourierStatistic = async () => {
      try {
        const response = await getTotalCourier(user.courier_id);
        if (response.status !== 200) {
          setIsLoading(false);
          console.error(response.response.data.error);
          throw new Error(`${response.message}, see details in console`);
        }
        const { day, month, week, year } = response.data.totals;
        setTodayTotals(day);
        setMonthlyTotals(month);
        setWeeklyTotals(week);
        setYearlyTotals(year);
        setIsLoading(false);
      } catch (error) {
        setError(error);
      }
    };
    fetchCourierStatistic();
  }, [user]);

  console.log(todayTotals);
  console.log(monthlyTotals);

  if (isLoading) {
    return <div className="loader mx-auto items-center mt-5"></div>;
  }

  if (error) {
    return <ErrorPage>{error.message}</ErrorPage>;
  }

  return (
    <>
      {/* Navbar */}
      <div className="container-sm lg:max-w-[1000px] mx-auto px-4 sm:w-screen">
        {/* Statistic Today */}
        <StatisticWrapper data={todayTotals} />

        {/* Barchart Section */}
        <div className="border border-revamp-neutral-10/20 rounded-lg  max-w-[1000px] px-2 py-6 mx-auto mb-8">
          {/* data chart belum sesuai */}
          <Chart
            data={{
              day: todayTotals,
              month: monthlyTotals,
              week: weeklyTotals,
              year: yearlyTotals,
            }}
          />
        </div>
      </div>
    </>
  );
}
