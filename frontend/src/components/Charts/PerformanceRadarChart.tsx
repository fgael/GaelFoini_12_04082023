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

import { UserPerformanceData } from "../../hooks/useUserPerformance";

interface PerformanceRadarChartProps {
  userPerformance: UserPerformanceData[];
}

interface RenderPolarAngleAxisProps {
  payload: UserPerformanceData;
  x: number;
  y: number;
  cx: number;
  cy: number;
}

// Fonction de rendu personnalisée pour les étiquettes de l'axe polar
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
      verticalAnchor="middle" // Alignement vertical au milieu
      y={y + (y - cy) / 10} // Position verticale de l'étiquette
      x={x + (x - cx) / 100} // Position horizontale de l'étiquette
    >
      {payload.value}
    </Text>
  );
};

const PerformanceRadarChart: React.FC<PerformanceRadarChartProps> = ({
  userPerformance,
}) => {
  return (
    <ResponsiveContainer width="100%">
      <RadarChart cx="50%" cy="50%" outerRadius="65%" data={userPerformance}>
        <PolarGrid stroke="#fff" strokeWidth={2} radialLines={false} />
        <PolarAngleAxis
          dataKey="kind"
          stroke="#fff"
          fontSize={12}
          strokeWidth={2}
          tickLine={false}
          tick={renderPolarAngleAxis} // Utilisation de la fonction de rendu personnalisée pour les étiquettes de l'axe
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
