import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/api";

import styles from "./HomePage.module.scss";

const HomePage: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await getUserInfo(12);
        setUserInfo(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Information</h1>
      <p>
        Name: {userInfo.userInfos.firstName} {userInfo.userInfos.lastName}
      </p>
      <p>Age: {userInfo.userInfos.age}</p>
      <p>Today's Score: {userInfo.todayScore}</p>
      <h2>Key Data</h2>
      <p>Calorie Count: {userInfo.keyData.calorieCount}</p>
      <p>Protein Count: {userInfo.keyData.proteinCount}</p>
      <p>Carbohydrate Count: {userInfo.keyData.carbohydrateCount}</p>
      <p>Lipid Count: {userInfo.keyData.lipidCount}</p>
    </div>
  );
};

export default HomePage;
