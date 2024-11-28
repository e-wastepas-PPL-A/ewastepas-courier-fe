/* eslint-disable react/prop-types */
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

const Chart = ({ data }) => {
  if (!data) {
    return <div className="flex justify-center py-4">No data available</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
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

export default Chart;
