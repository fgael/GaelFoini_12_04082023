import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AverageSessionsLineChartProps {
  userAverageSessions: any[];
}

const ActivityBarChart: React.FC<AverageSessionsLineChartProps> = ({
  userAverageSessions,
}) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={userAverageSessions}
        style={{ background: "#FF0000", borderRadius: "10px" }}
        margin={{ bottom: 10, top: 10, left: 10, right: 10 }}
      >
        <text
          x="30"
          y="30"
          opacity={0.6}
          textAnchor="start"
          dominantBaseline="hanging"
          fill="white"
        >
          Durée moyenne des
        </text>
        <text
          x="30"
          y="50"
          textAnchor="start"
          opacity={0.6}
          dominantBaseline="hanging"
          fill="white"
        >
          sessions
        </text>

        <XAxis
          dataKey="dayLetter"
          tickLine={false}
          axisLine={false}
          stroke="#fff"
          dy={5}
          tick={{
            stroke: "#fff",
            opacity: 0.6,
            fontSize: 12,
          }}
        />
        <YAxis
          domain={["dataMin", "dataMax + 25"]}
          dataKey="sessionLength"
          hide
        />
        <Tooltip
          separator=""
          formatter={(value) => [`${value} min`]}
          labelFormatter={() => ""}
          itemStyle={{ color: "#000" }}
        />
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(245, 245, 245, 0.5)" />
            <stop offset="100%" stopColor="#FFF" />
          </linearGradient>
        </defs>
        <Line
          type="monotone"
          dataKey="sessionLength"
          stroke="url(#lineGradient)"
          strokeWidth={3}
          dot={false}
          activeDot={{
            fill: "#FFF",
            r: 4,
            strokeWidth: 4,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ActivityBarChart;
