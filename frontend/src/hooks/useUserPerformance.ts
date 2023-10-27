import { useEffect, useState } from "react";
import { getUserPerformance } from "../services/api.js";

import { userPerformanceMockData } from "../mocks/userPerformanceMockData.js";

// Etablissement de la tructure des données de performance utilisateur
export interface UserPerformanceData {
  kind: string;
  value: number;
}

export const useUserPerformance = (userId: number) => {
  // Etat pour stocker données d'activité de performance
  const [userPerformance, setUserPerformance] = useState<UserPerformanceData[]>(
    []
  );
  // Etat pour gérer le chargement
  const [loading, setLoading] = useState<boolean>(true);
  // Etat pour gérer les erreurs
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let data;
        if (userId === 0) {
          data = userPerformanceMockData;
        } else {
          // Appel asynchrone pour obtenir les données brutes de performance
          const response = await getUserPerformance(userId);
          data = response.data;
        }

        // Traduction des types de performance en utilisant un mapping
        const kindMapping: Record<string, string> = {
          "1": "Cardio",
          "2": "Energie",
          "3": "Endurance",
          "4": "Force",
          "5": "Vitesse",
          "6": "Intensité",
        };

        // Ordre spécifique pour afficher les types de performance
        const specificOrder: string[] = [
          "Intensité",
          "Vitesse",
          "Force",
          "Endurance",
          "Energie",
          "Cardio",
        ];

        // Formatage des données en associant le type à sa traduction et tri par ordre spécifique
        const formattedUserPerformance: UserPerformanceData[] = data.data
          .map((entry: UserPerformanceData) => ({
            kind: kindMapping[entry.kind.toString()] || entry.kind,
            value: entry.value,
          }))
          .sort(
            (a: UserPerformanceData, b: UserPerformanceData) =>
              specificOrder.indexOf(a.kind) - specificOrder.indexOf(b.kind)
          );

        // Mise à jour de l'état avec les données formatées
        setUserPerformance(formattedUserPerformance);
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
  // Retourne un objet contenant les données de performance de l'utilisateur, l'état de chargement et les erreurs
  return { userPerformance, loading, error };
};
