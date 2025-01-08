/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Chart = ({ data }) => {
  const [timeFrame, setTimeFrame] = useState("day");

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  const chartData =
    data && data[timeFrame]
      ? [
          {
            metric: "Requested",
            value: data[timeFrame].totalRequested,
            color: "#8B5CF6",
          },
          {
            metric: "On Delivery",
            value: data[timeFrame].totalOnDelivery,
            color: "#10B981",
          },
          {
            metric: "Cancelled",
            value: data[timeFrame].totalCancelled,
            color: "#F43F5E",
          },
          {
            metric: "Delivered",
            value: data[timeFrame].totalDelivered,
            color: "#3B82F6",
          },
          {
            metric: "Finished",
            value: data[timeFrame].totalFinished,
            color: "#14B8A6",
          },
        ]
      : [];

  const TimeFrameButton = ({ value, label }) => (
    <button
      onClick={() => setTimeFrame(value)}
      className={`px-4 py-2 rounded-lg font-medium ${
        timeFrame === value
          ? "bg-revamp-secondary-400 text-white"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      } transition-colors`}>
      {label}
    </button>
  );

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-lg p-6">
      <div className="flex flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Delivery Statistics
        </h2>
        <div className="flex gap-2 mb-4">
          <TimeFrameButton value="day" label="Day" />
          <TimeFrameButton value="week" label="Week" />
          <TimeFrameButton value="month" label="Month" />
          <TimeFrameButton value="year" label="Year" />
        </div>
      </div>

      <div className="h-96 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}>
            <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
            <XAxis
              dataKey="metric"
              tick={{ fill: "#4B5563" }}
              tickLine={{ stroke: "#4B5563" }}
            />
            <YAxis
              tick={{ fill: "#4B5563" }}
              tickLine={{ stroke: "#4B5563" }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "0.375rem",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={({ payload }) => (
                <circle
                  cx={0}
                  cy={0}
                  r={6}
                  fill={payload.color}
                  stroke={payload.color}
                />
              )}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-end text-sm text-gray-600">
          Period: {formatDate(data[timeFrame]?.startDate)} -{" "}
          {formatDate(data[timeFrame]?.endDate)}
        </div>
      </div>
    </div>
  );
};

export default Chart;