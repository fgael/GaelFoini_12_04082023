import { useEffect, useState } from "react";
import { getUserAverageSessions } from "../services/api.js";

import { userAverageSessionMockData } from "../mocks/userAverageSessionMockData.js";

// Etablissement de la tructure des données de session
export interface UserAverageSessionsData {
  day: number;
  sessionLength: number;
  dayLetter: string;
}

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

export const useUserAverageSessions = (userId: number) => {
  // Etat pour stocker données de session de l'utilisateur
  const [userAverageSessions, setUserAverageSessions] = useState<
    UserAverageSessionsData[]
  >([]);
  // Etat pour gérer le chargement
  const [loading, setLoading] = useState<boolean>(true);
  // Etat pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  // Effet qui s'exécute lorsque userId change
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (userId === 0) {
          // Utilisation des data mock
          data = userAverageSessionMockData;
        } else {
          // Appel asynchrone pour récupérer les données de sessions de l'utilisateur
          const response = await getUserAverageSessions(userId);
          data = response.data;
        }
        // Formatage des données pour y ajouter les lettres des jours de la semaine en correspondance avec la valeur day
        const formattedUserAverageSessions = data.sessions.map(
          (session: UserAverageSessionsData) => ({
            ...session,
            dayLetter: dayMapping[session.day],
          })
        );
        // Mise à jour de l'état avec les données formatées
        setUserAverageSessions(formattedUserAverageSessions);
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

    fetchData();
    // L'effet dépend de userId
  }, [userId]);
  // Retourne un objet contenant les données de session de l'utilisateur, l'état de chargement et les erreurs
  return { userAverageSessions, loading, error };
};
