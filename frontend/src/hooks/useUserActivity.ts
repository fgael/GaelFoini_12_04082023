import { useEffect, useState } from "react";
import { getUserActivity } from "../services/api.js";

interface UserActivityData {
  day: string;
  kilogram: number;
  calories: number;
}

export const useUserActivity = (userId: number) => {
  const [userActivity, setUserActivity] = useState<UserActivityData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (userId !== 0) {
        try {
          const { data } = await getUserActivity(userId);
          const formattedUserActivity: UserActivityData[] = data.sessions.map(
            (session: UserActivityData, index: number) => ({
              number: index + 1,
              date: session.day,
              calories: session.calories,
              kilogram: session.kilogram,
            })
          );

          setUserActivity(formattedUserActivity);
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

  return { userActivity, loading, error };
};
