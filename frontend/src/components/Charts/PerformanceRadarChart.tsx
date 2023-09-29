import React from "react";
import {
  Radar,
  RadarChart,
  ResponsiveContainer,
  PolarAngleAxis,
  PolarGrid,
  Tooltip,
  Text,
} from "recharts";

interface PerformanceRadarChartProps {
  userPerformance: any[];
}

interface RenderPolarAngleAxisProps {
  payload: any;
  x: number;
  y: number;
  cx: number;
  cy: number;
}

const renderPolarAngleAxis = ({
  payload,
  x,
  y,
  cx,
  cy,
  ...rest
}: RenderPolarAngleAxisProps) => {
  return (
    <Text
      {...rest}
      verticalAnchor="middle"
      y={y + (y - cy) / 10}
      x={x + (x - cx) / 100}
    >
      {payload.value}
    </Text>
  );
};

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({
  userPerformance,
}) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={userPerformance}>
        <PolarGrid stroke="#fff" strokeWidth={2} radialLines={false} />
        <PolarAngleAxis
          dataKey="kind"
          stroke="#fff"
          fontSize={12}
          strokeWidth={2}
          tickLine={false}
          tick={renderPolarAngleAxis}
        />
        <Radar
          dataKey={"value"}
          fill="#FF0101"
          stroke="#FF0101"
          opacity="70%"
        />
        <Tooltip
          separator=""
          formatter={(value) => [value, ""]}
          labelFormatter={() => ""}
          contentStyle={{ backgroundColor: "#FF0101" }}
          itemStyle={{ color: "#fff" }}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default PerformanceRadarChart;
