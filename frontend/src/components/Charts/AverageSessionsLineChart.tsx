import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Rectangle,
} from "recharts";

import { UserAverageSessionsData } from "../../hooks/useUserAverageSession";

interface AverageSessionsLineChartProps {
  userAverageSessions: UserAverageSessionsData[];
}

interface CustomCursorProps {
  points: { x: number; y: number }[];
}

// Composant personnalisé pour le curseur
const CustomCursor: React.FC<CustomCursorProps> = ({ points }) => {
  if (!points.length) {
    return null;
  }

  // Coordonnées du curseur
  const X = points[0].x;
  const Y = points[0].y;

  return (
    <g>
      {/* Rectangle semi-transparent pour mettre en évidence le graph */}
      <Rectangle
        width={500}
        height={500}
        x={X}
        y={Y - 50}
        style={{ opacity: 0.1 }}
      />
    </g>
  );
};

const ActivityBarChart: React.FC<AverageSessionsLineChartProps> = ({
  userAverageSessions,
}) => {
  return (
    <ResponsiveContainer width="100%" height={240}>
      <LineChart
        data={userAverageSessions}
        margin={{ bottom: 10, top: 10, left: 10, right: 10 }}
      >
        {/* Titres pour les axes X et Y */}
        <text
          x="30"
          y="30"
          opacity={0.6}
          textAnchor="start"
          dominantBaseline="hanging" // Alignement sur le haut du graph
          fill="white"
        >
          Durée moyenne des
        </text>
        <text
          x="30"
          y="50"
          textAnchor="start"
          opacity={0.6}
          dominantBaseline="hanging" // Alignement sur le haut du graph
          fill="white"
        >
          sessions
        </text>

        <XAxis
          dataKey="dayLetter" // La clé des données pour l'axe X
          tickLine={false} // Supprime les lignes de repère
          axisLine={false} // Supprime la ligne d'axe
          stroke="#fff"
          dy={5}
          tick={{
            stroke: "#fff",
            opacity: 0.6,
            fontSize: 12,
          }}
        />
        <YAxis
          dataKey="sessionLength" // La clé des données pour l'axe Y
          domain={["dataMin", "dataMax + 25"]} // Domaine des valeurs (avec une marge)
          hide
        />
        {/* Infobulle du graphique */}
        <Tooltip
          separator=""
          formatter={(value) => [`${value} min`]}
          labelFormatter={() => ""}
          itemStyle={{ color: "#000" }}
          // Curseur personnalisé pour afficher un rectangle
          cursor={<CustomCursor points={[]} />}
        />
        <defs>
          {/* Dégradé pour la ligne du graphique */}
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
          // Style du point actif au survol
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
