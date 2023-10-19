import { useEffect, useState } from "react";
import { getUserActivity } from "../services/api.js";

// Etablissement de la tructure des données d'activité
interface UserActivityData {
  number: number;
  day: string;
  kilogram: number;
  calories: number;
}

export const useUserActivity = (userId: number) => {
  // Etat pour stocker données d'activité de l'utilisateur
  const [userActivity, setUserActivity] = useState<UserActivityData[]>([]);
  // Etat pour gérer le chargement
  const [loading, setLoading] = useState<boolean>(true);
  // Etat pour gérer les erreurs
  const [error, setError] = useState<any | null>(null);

  // Effet qui s'exécute lorsque userId change
  useEffect(() => {
    const fetchData = async () => {
      if (userId !== 0) {
        try {
          // Appel asynchrone pour récupérer les données d'activité de l'utilisateur
          const { data } = await getUserActivity(userId);
          // Formatage des données pour y ajouter un nombre
          const formattedUserActivity: UserActivityData[] = data.sessions.map(
            (session: UserActivityData, index: number) => ({
              number: index + 1,
              date: session.day,
              calories: session.calories,
              kilogram: session.kilogram,
            })
          );
          // Mise à jour de l'état avec les données formatées
          setUserActivity(formattedUserActivity);
          // Réinitialisation de l'état d'erreur
          setError(null);
          // Fin du chargement
          setLoading(false);
        } catch (error) {
          // Gestion des erreurs en cas d'échec de l'appel asynchrone
          console.log(error);
          setError(error);
          // Fin du chargement
          setLoading(false);
        }
      }
    };

    fetchData();
    // L'effet dépend de userId
  }, [userId]);
  // Retourne un objet contenant les données d'activité de l'utilisateur, l'état de chargement et les erreurs
  return { userActivity, loading, error };
};
