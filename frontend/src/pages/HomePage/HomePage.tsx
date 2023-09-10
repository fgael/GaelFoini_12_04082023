import { useUserInfo } from "../../hooks/useUserInfo";

import styles from "./HomePage.module.scss";
import CardIcon from "../../components/CardIcon/CardIcon";
import ActivityBarChart from "../../components/Charts/ActivityBarChart";

import appleIcon from "../../assets/icons/apple.svg";
import cheeseburgerIcon from "../../assets/icons/cheeseburger.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import energyIcon from "../../assets/icons/energy.svg";

// user ID is hardcoded, use 12 or 18 for different users

const HomePage: React.FC = () => {
  const { user, loading, error } = useUserInfo(12);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return (
      <div>
        Erreur : Impossible de récupérer les données de l'utilisateur. Veuillez
        réessayer ultérieurement.
      </div>
    );
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div className={styles.homePage}>
      <h1>
        Bonjour
        <span className={styles.firstName}> {user.userInfos.firstName}</span>
      </h1>
      <p className={styles.subtitle}>
        Félicitation ! Vous avez explosé vos objectifs hier 👏
      </p>
      <div className="container mx-auto p-4">
        <ActivityBarChart userId={user.id} />
      </div>
      <CardIcon
        icon={energyIcon}
        color="#FF0000"
        content={user.keyData.calorieCount + "kCal"}
        title={"Calories"}
      />
      <CardIcon
        icon={chickenIcon}
        color="#4AB8FF"
        content={user.keyData.proteinCount + "g"}
        title={"Proteines"}
      />
      <CardIcon
        icon={appleIcon}
        color="#F9CE23"
        content={user.keyData.carbohydrateCount + "g"}
        title={"Glucides"}
      />
      <CardIcon
        icon={cheeseburgerIcon}
        color="#FD5181"
        content={user.keyData.lipidCount + "g"}
        title={"Lipides"}
      />
      <p>Today's Score: {user.todayScore}</p>
    </div>
  );
};

export default HomePage;
