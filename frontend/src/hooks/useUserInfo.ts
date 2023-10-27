import { useEffect, useState } from "react";
import { getUserInfo } from "../services/api";

// Import user info data mock
import { userInfoMockData } from "../mocks/userInfosMockData.ts";

// Etablissement de la tructure des données utilisateur
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

// Fonction pour formatter les nombres avec l'ajout d'une virgule après les 3 premières décimales
function formatNumberWithComma(number: number): string {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const useUserInfo = (userId: number) => {
  // Etat pour stocker données de l'utilisateur
  const [user, setUserInfo] = useState<UserInfoData>();
  // Etat pour gérer le chargement
  const [loading, setLoading] = useState<boolean>(true);
  // Etat pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        let data;
        if (userId === 0) {
          // Utilisation des data mock
          data = userInfoMockData;
        } else {
          // Appel asynchrone pour récupérer les données de l'utilisateur
          const response = await getUserInfo(userId);
          data = response.data;
        }
        // Création d'un nouvel objet formattedKeyData en copiant les propriétés de data.keyData
        // et en appliquant la fonction de formatage formatNumberWithComma
        const formattedKeyData = {
          ...data.keyData,
          calorieCount: formatNumberWithComma(data.keyData.calorieCount),
          proteinCount: formatNumberWithComma(data.keyData.proteinCount),
          carbohydrateCount: formatNumberWithComma(
            data.keyData.carbohydrateCount
          ),
          lipidCount: formatNumberWithComma(data.keyData.lipidCount),
        };

        // Création d'un nouvel objet formattedData en copiant l'objet data original
        // et en remplaçant sa propriété keyData par le nouvel objet formattedKeyData
        const formattedData = {
          ...data,
          keyData: formattedKeyData,
        };

        // Mise à jour de l'état avec les données formatées
        setUserInfo(formattedData);
        // Réinitialisation de l'état d'erreur
        setError(null);
        // Fin du chargement
        setLoading(false);
      } catch (error) {
        // Gestion des erreurs en cas d'échec de l'appel asynchrone
        console.log(error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("Une erreur inconnue s'est produite");
        }
        // Fin du chargement
        setLoading(false);
      }
    };

    fetchUserInfo();
    // L'effet dépend de userId
  }, [userId]);
  // Retourne un objet contenant les données utilisateur, l'état de chargement et les erreurs
  return { user, loading, error };
};
