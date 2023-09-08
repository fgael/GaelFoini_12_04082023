import { useEffect, useState } from "react";
import { getUserInfo } from "../../services/api";

import styles from "./HomePage.module.scss";
import CardIcon from "../../components/CardIcon/CardIcon";

import appleIcon from "../../assets/icons/apple.svg";
import cheeseburgerIcon from "../../assets/icons/cheeseburger.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import energyIcon from "../../assets/icons/energy.svg";

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
    <div className={styles.homePage}>
      <h1>
        Bonjour
        <span className={styles.firstName}>
          {" "}
          {userInfo.userInfos.firstName}
        </span>
      </h1>
      <p className={styles.subtitle}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
      <CardIcon
        icon={energyIcon}
        color="#FF0000"
        content={userInfo.keyData.calorieCount + "kCal"}
        title={"Calories"}
      />
      <CardIcon
        icon={chickenIcon}
        color="#4AB8FF"
        content={userInfo.keyData.proteinCount + "g"}
        title={"Proteines"}
      />
      <CardIcon
        icon={appleIcon}
        color="#F9CE23"
        content={userInfo.keyData.carbohydrateCount + "g"}
        title={"Glucides"}
      />
      <CardIcon
        icon={cheeseburgerIcon}
        color="#FD5181"
        content={userInfo.keyData.lipidCount + "g"}
        title={"Lipides"}
      />
      <p>Today's Score: {userInfo.todayScore}</p>
    </div>
  );
};

export default HomePage;
