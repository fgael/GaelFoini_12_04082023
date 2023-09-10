import { useUserActivity } from "../../hooks/useUserActivity";

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
  userId: number;
}

const ActivityBarChart: React.FC<ActivityBarChartProps> = ({ userId }) => {
  const { userActivity, loading, error } = useUserActivity(userId);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userActivity) {
    return (
      <div>
        Erreur : Impossible de récupérer les données de l'utilisateur. Veuillez
        réessayer ultérieurement.
      </div>
    );
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={userActivity}>
        <CartesianGrid strokeDasharray="2 2" vertical={false} />
        <XAxis dataKey="date" tickLine={false} />
        <YAxis
          dataKey="kilogram"
          yAxisId={1}
          domain={["dataMin - 10", "dataMax + 10"]}
          orientation="right"
          axisLine={false}
          allowDecimals={false}
        />
        <YAxis dataKey="calories" yAxisId={2} hide />
        <Tooltip />
        <text dy={+20} width={200}>
          Activité quotidienne
        </text>
        <Legend
          height={40}
          verticalAlign="top"
          align="right"
          iconType="circle"
          iconSize={8}
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
