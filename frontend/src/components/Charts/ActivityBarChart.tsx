import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ActivityBarChartProps {
  userActivity: any[];
}

const ActivityBarChart: React.FC<ActivityBarChartProps> = ({
  userActivity,
}) => {
  return (
    <ResponsiveContainer width="100%" minHeight={300}>
      <BarChart
        data={userActivity}
        margin={{
          top: 5,
          right: 50,
          left: 50,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis
          dataKey="number"
          tickLine={false}
          axisLine={false}
          padding={{ left: -50, right: -50 }}
        />
        <YAxis
          dataKey="kilogram"
          yAxisId={1}
          domain={["dataMin - 10", "dataMax + 10"]}
          orientation="right"
          axisLine={false}
          allowDecimals={false}
          tickLine={false}
          tickMargin={50}
        />
        <YAxis dataKey="calories" yAxisId={2} hide />
        <Tooltip
          separator=""
          formatter={(value, name) => {
            if (name === "Poids (kg)") {
              return [`${value}kg`, ""];
            } else if (name === "Calories brûlées (kCal)") {
              return [`${value}kCal`, ""];
            }
            return ["", `${value}`];
          }}
          labelFormatter={() => ""}
          contentStyle={{ backgroundColor: "#FF0101" }}
          itemStyle={{ color: "#fff" }}
        />
        <text
          x={80}
          y={20}
          fill="#000"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="15">Activité Quotidienne</tspan>
        </text>
        <Legend
          height={40}
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={8}
          formatter={(value: string) => {
            return (
              <span style={{ color: "#000", marginLeft: "8px" }}>{value}</span>
            );
          }}
        />
        <Bar
          dataKey="kilogram"
          yAxisId={1}
          fill="#282D30"
          barSize={10}
          radius={[15, 15, 0, 0]}
          name="Poids (kg)"
        />
        <Bar
          dataKey="calories"
          yAxisId={2}
          fill="#E60000"
          barSize={10}
          radius={[15, 15, 0, 0]}
          name="Calories brûlées (kCal)"
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityBarChart;
