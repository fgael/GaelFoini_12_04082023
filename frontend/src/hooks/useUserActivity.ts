import { useEffect, useState } from "react";
import { getUserActivity } from "../services/api.js";

interface SessionData {
  day: string;
  kilogram: number;
  calories: number;
}

export const useUserActivity = (userId: number) => {
  const [userActivity, setUserActivity] = useState<SessionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await getUserActivity(userId);
        const formattedUserActivity: SessionData[] = data.sessions.map(
          (session: SessionData, index: number) => ({
            number: index + 1,
            date: session.day,
            calories: session.calories,
            kilogram: session.kilogram,
          })
        );

        setUserActivity(formattedUserActivity);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  return { userActivity, loading, error };
};
