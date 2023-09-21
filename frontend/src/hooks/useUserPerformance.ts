import { useEffect, useState } from "react";
import { getUserPerformance } from "../services/api.js";

interface UserPerformanceData {
  kind: string;
  value: number;
}

export const useUserPerformance = (userId: number) => {
  const [userPerformance, setUserPerformance] = useState<UserPerformanceData[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId !== 0) {
        try {
          const { data } = await getUserPerformance(userId);

          // traduction
          const kindMapping: Record<string, string> = {
            "1": "Cardio",
            "2": "Energie",
            "3": "Endurance",
            "4": "Force",
            "5": "Vitesse",
            "6": "Intensité",
          };

          // ordre
          const specificOrder: string[] = [
            "Intensité",
            "Vitesse",
            "Force",
            "Endurance",
            "Energie",
            "Cardio",
          ];

          const formattedUserPerformance: UserPerformanceData[] = data.data
            .map((entry: any) => ({
              kind: kindMapping[entry.kind.toString()] || entry.kind,
              value: entry.value,
            }))
            .sort(
              (a: UserPerformanceData, b: UserPerformanceData) =>
                specificOrder.indexOf(a.kind) - specificOrder.indexOf(b.kind)
            );

          setUserPerformance(formattedUserPerformance);
          setError(null);
          setLoading(false);
        } catch (error) {
          console.log(error);
          setError(error);
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [userId]);

  return { userPerformance, loading, error };
};
