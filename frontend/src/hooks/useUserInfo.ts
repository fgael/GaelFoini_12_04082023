import { useEffect, useState } from "react";
import { getUserInfo } from "../services/api";

interface UserInfoData {
  id: number;
  userInfos: {
    firstName: string;
    lastName: string;
    age: number;
  };
  todayScore: number;
  score: number;
  keyData: {
    calorieCount: number;
    proteinCount: number;
    carbohydrateCount: number;
    lipidCount: number;
  };
}

function formatNumberWithComma(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const useUserInfo = (userId: number) => {
  const [user, setUserInfo] = useState<UserInfoData>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await getUserInfo(userId);
        const formattedKeyData = {
          ...data.keyData,
          calorieCount: formatNumberWithComma(data.keyData.calorieCount),
          proteinCount: formatNumberWithComma(data.keyData.proteinCount),
          carbohydrateCount: formatNumberWithComma(
            data.keyData.carbohydrateCount
          ),
          lipidCount: formatNumberWithComma(data.keyData.lipidCount),
        };

        const formattedData = {
          ...data,
          keyData: formattedKeyData,
        };

        setUserInfo(formattedData);
        setError(null);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [userId]);

  return { user, loading, error };
};
