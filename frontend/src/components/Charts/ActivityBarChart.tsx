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

import { UserActivityData } from "../../hooks/useUserActivity";

// Interface pour les props du composant
interface ActivityBarChartProps {
  userActivity: UserActivityData[];
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
          dataKey="number" // La clé des données pour l'axe X
          tickLine={false} // Supprime les lignes de repère
          axisLine={false} // Supprime la ligne d'axe
          padding={{ left: -50, right: -50 }}
        />
        <YAxis
          dataKey="kilogram" // La clé des données pour l'axe Y
          yAxisId={1} // Identifiant de l'axe Y
          domain={["dataMin - 10", "dataMax + 10"]} // Domaine des valeurs (avec une marge)
          orientation="right" // Orientation de l'axe à droite
          axisLine={false} // Supprime la ligne d'axe
          allowDecimals={false} // Empêche les décimales sur l'axe
          tickLine={false} // Supprime les lignes de repère
          tickMargin={50} // Marge entre les repères
        />
        {/* Axe Y (à gauche) : représente les valeurs en calories (Calories brûlées) */}
        <YAxis dataKey="calories" yAxisId={2} hide />
        {/* Infobulle du graphique */}
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
          labelFormatter={() => ""} // Masque le label
          contentStyle={{ backgroundColor: "#FF0101" }} // Style de l'infobulle
          itemStyle={{ color: "#fff" }} // Style des éléments de l'infobulle
        />
        {/* Titre du graphique */}
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
        {/* Légende du graphique */}
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
        {/* Barres de données (Poids en kg) */}
        <Bar
          dataKey="kilogram"
          yAxisId={1} // Lier à l'axe Y avec l'ID 1
          fill="#282D30" // Couleur de remplissage
          barSize={10} // Largeur des barres
          radius={[15, 15, 0, 0]} // Radius des barres
          name="Poids (kg)" // Nom dans la légende
        />
        {/* Barres de données (Calories brûlées en kCal) */}
        <Bar
          dataKey="calories"
          yAxisId={2} // Lier à l'axe Y avec l'ID 2 (masqué)
          fill="#E60000" // Couleur de remplissage
          barSize={10} // Largeur des barres
          radius={[15, 15, 0, 0]} // Radius des barres
          name="Calories brûlées (kCal)" // Nom dans la légende
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ActivityBarChart;
