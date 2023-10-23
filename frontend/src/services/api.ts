import axios from "axios";

// URL de base de l'API
const API_BASE_URL = "http://localhost:3000";

// Fonction pour obtenir les informations de l'utilisateur en fonction de son ID
export const getUserInfo = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);

    // Renvoie les données reçues en réponse à la requête
    return response.data;
  } catch (error) {
    // En cas d'erreur, affiche un message d'erreur dans la console et propage l'erreur
    console.error("Error fetching user info:", error);
    throw error;
  }
};

// Fonction pour obtenir les données d'activité de l'utilisateur en fonction de son ID
export const getUserActivity = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/activity`);

    // Renvoie les données reçues en réponse à la requête
    return response.data;
  } catch (error) {
    // En cas d'erreur, affiche un message d'erreur dans la console et propage l'erreur
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

// Fonction pour obtenir les sessions moyennes de l'utilisateur en fonction de son ID
export const getUserAverageSessions = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/average-sessions`
    );

    // Renvoie les données reçues en réponse à la requête
    return response.data;
  } catch (error) {
    // En cas d'erreur, affiche un message d'erreur dans la console et propage l'erreur
    console.error("Error fetching user average sessions:", error);
    throw error;
  }
};

// Fonction pour obtenir les données de performance de l'utilisateur en fonction de son ID
export const getUserPerformance = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/performance`
    );

    // Renvoie les données reçues en réponse à la requête
    return response.data;
  } catch (error) {
    // En cas d'erreur, affiche un message d'erreur dans la console et propage l'erreur
    console.error("Error fetching user performance:", error);
    throw error;
  }
};
