import axios from "axios";

const API_BASE_URL = "http://localhost:3000";

export const getUserInfo = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};

export const getUserActivity = async (userId: number) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/user/${userId}/activity`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user activity:", error);
    throw error;
  }
};

export const getUserAverageSessions = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/average-sessions`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user average sessions:", error);
    throw error;
  }
};

export const getUserPerformance = async (userId: number) => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/user/${userId}/performance`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching user performance:", error);
    throw error;
  }
};
