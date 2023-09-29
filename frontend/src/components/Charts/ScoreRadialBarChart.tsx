import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

interface ScoreRadialBarChartProps {
  userScore: number;
}

const ScoreRadialBarChart: React.FC<ScoreRadialBarChartProps> = ({
  userScore,
}) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <RadialBarChart
        cx="50%"
        cy="50%"
        innerRadius="70%"
        startAngle={90}
        endAngle={90 + 360 * userScore}
        barSize={10}
        data={[{ score: userScore }]}
      >
        {/* <circle cx="50%" cy="50%" r="30%" fill="#FFFFFF" /> */}
        <text
          x={50}
          y={30}
          fill="#000"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="central"
        >
          <tspan fontSize="18">Score</tspan>
        </text>
        <RadialBar
          fill="#ff0000"
          widths={10}
          dataKey="score"
          cornerRadius="50%"
        />
        <text
          x="50%"
          y="35%"
          alignmentBaseline="central"
          fill="#000"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan dy="0.8em" fontSize="26">
            {userScore * 100}%
          </tspan>
        </text>
        <text
          x="50%"
          y="50%"
          alignmentBaseline="central"
          fill="#74798C"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          <tspan x="50%" dy="1em" fontSize="18" fontWeight="normal">
            de votre
          </tspan>
          <tspan x="50%" dy="1.4em" fontSize="18" fontWeight="normal">
            objectif
          </tspan>
        </text>
      </RadialBarChart>
    </ResponsiveContainer>
  );
};

export default ScoreRadialBarChart;
