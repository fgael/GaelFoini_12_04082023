import { useEffect, useState } from "react";
import { getUserAverageSessions } from "../services/api.js";

interface UserAverageSessionsData {
  day: number;
  sessionLength: number;
  dayLetter: string; // Ajout de la propriété dayLetter
}

export const useUserAverageSessions = (userId: number) => {
  const [userAverageSessions, setUserAverageSessions] = useState<
    UserAverageSessionsData[]
  >([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  // Tableau de correspondance des jours
  const dayMapping: { [key: number]: string } = {
    1: "L",
    2: "M",
    3: "M",
    4: "J",
    5: "V",
    6: "S",
    7: "D",
  };

  useEffect(() => {
    const fetchData = async () => {
      if (userId !== 0) {
        try {
          const { data } = await getUserAverageSessions(userId);

          const formattedUserAverageSessions = data.sessions.map(
            (session: UserAverageSessionsData) => ({
              ...session,
              dayLetter: dayMapping[session.day],
            })
          );

          setUserAverageSessions(formattedUserAverageSessions);
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

  return { userAverageSessions, loading, error };
};
