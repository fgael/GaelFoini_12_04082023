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
      <p>Today's Score: {user.todayScore}</p>
      <div className="flex flex-row gap-4 lg:gap-8">
        {/* Partie de gauche */}
        <div className="flex flex-col grow justify-between gap-4 lg:gap-8 w-9/12 lg:w-10/12">
          <div className="bg-gray-50 p-4 rounded-lg">
            <ActivityBarChart userId={user.id} />
          </div>
          <div className="grid grid-cols-12 gap-4 lg:gap-8">
            <div className="col-span-4">
              <div className="h-64 bg-black"></div>
            </div>
            <div className="col-span-4">
              <div className="h-64 bg-red-900 "></div>
            </div>
            <div className="col-span-4">
              <div className="h-64 bg-indigo-400"></div>
            </div>
          </div>
        </div>

        {/* Partie de droite */}
        <div
          className="flex flex-col justify-between w-3/12
 lg:w-2/12"
        >
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
        </div>
      </div>
    </div>
  );
};

export default HomePage;
