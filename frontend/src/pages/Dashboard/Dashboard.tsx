import React from "react";

// Import hooks
import { useUserInfo } from "../../hooks/useUserInfo";
import { useUserActivity } from "../../hooks/useUserActivity";
import { useUserPerformance } from "../../hooks/useUserPerformance";
import { useUserAverageSessions } from "../../hooks/useUserAverageSession";

// Import module style
import styles from "./Dashboard.module.scss";

// Import composant
import CardIcon from "../../components/CardIcon/CardIcon";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Snackbar from "../../components/Snackbar/Snackbar";

// Import composant chart
import ActivityBarChart from "../../components/Charts/ActivityBarChart";
import ScoreRadialBarChart from "../../components/Charts/ScoreRadialBarChart";
import PerformanceRadarChart from "../../components/Charts/PerformanceRadarChart";
import AverageSessionsLineChart from "../../components/Charts/AverageSessionsLineChart";

// Import icones
import appleIcon from "../../assets/icons/apple.svg";
import cheeseburgerIcon from "../../assets/icons/cheeseburger.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import energyIcon from "../../assets/icons/energy.svg";

const Dashboard: React.FC = () => {
  // Utilisation hooks pour récupérer les données de l'utilisateur
  // Params de useUserInfo 12 et 18 pour utiliser les data de l'API
  // Remplacer le params de useUserInfo par 0 pour utiliser les data de mock
  const { user, loading: userLoading, error: userError } = useUserInfo(0);

  const {
    userActivity,
    loading: activityLoading,
    error: activityError,
  } = useUserActivity(user?.id || 0);

  const {
    userPerformance,
    loading: performanceLoading,
    error: performanceError,
  } = useUserPerformance(user?.id || 0);

  const {
    userAverageSessions,
    loading: averageSessionsLoading,
    error: averageSessionsError,
  } = useUserAverageSessions(user?.id || 0);

  // Vérification de l'état de chargement global
  const isLoading =
    (userLoading ||
      activityLoading ||
      performanceLoading ||
      averageSessionsLoading) &&
    (!userError || typeof userError === "string") &&
    (!activityError || typeof activityError === "string") &&
    (!performanceError || typeof performanceError === "string") &&
    (!averageSessionsError || typeof averageSessionsError === "string");

  // Affichage du composant loading spinner en cas de chargement
  if (isLoading) {
    return <LoadingSpinner />;
  }

  // Vérification de la disponibilité des données de l'utilisateur et de l'absence d'erreurs
  const hasUserData =
    user &&
    userActivity &&
    userPerformance &&
    userAverageSessions &&
    !userError &&
    !activityError &&
    !performanceError &&
    !averageSessionsError;

  // Vérification de la présence d'erreurs
  const hasError =
    userError || activityError || performanceError || averageSessionsError;

  return (
    <div className={styles.dashboard}>
      {hasUserData && (
        <div>
          <h1>
            Bonjour
            <span className={styles.firstName}>
              &nbsp;
              {user.userInfos.firstName}
            </span>
          </h1>
          <p className={styles.subtitle}>
            Félicitation ! Vous avez explosé vos objectifs hier 👏
          </p>
          <div className="flex flex-row gap-4 lg:gap-8">
            {/* Partie de gauche graph */}
            <div className="flex flex-col grow justify-between gap-4 lg:gap-8 w-9/12 lg:w-10/12">
              <div className="p-4 rounded-lg bg-gray-50">
                <ActivityBarChart userActivity={userActivity} />
              </div>
              <div className="grid grid-cols-12 gap-4 lg:gap-8">
                <div className="col-span-4 rounded-lg bg-[#FF0000]">
                  <AverageSessionsLineChart
                    userAverageSessions={userAverageSessions}
                  />
                </div>
                <div className="col-span-4 rounded-lg bg-[#282D30]">
                  <PerformanceRadarChart userPerformance={userPerformance} />
                </div>
                <div className="col-span-4 rounded-lg bg-[#FBFBFB]">
                  <ScoreRadialBarChart
                    userScore={user?.todayScore || user?.score}
                  />
                </div>
              </div>
            </div>
            {/* Partie de droite composant card icons*/}
            <div className="flex flex-col justify-between w-3/12 lg:w-2/12">
              <CardIcon
                icon={energyIcon}
                color="#FF0000"
                content={user?.keyData.calorieCount + "kCal"}
                title={"Calories"}
              />
              <CardIcon
                icon={chickenIcon}
                color="#4AB8FF"
                content={user?.keyData.proteinCount + "g"}
                title={"Proteines"}
              />
              <CardIcon
                icon={appleIcon}
                color="#F9CE23"
                content={user?.keyData.carbohydrateCount + "g"}
                title={"Glucides"}
              />
              <CardIcon
                icon={cheeseburgerIcon}
                color="#FD5181"
                content={user?.keyData.lipidCount + "g"}
                title={"Lipides"}
              />
            </div>
          </div>
        </div>
      )}
      {/* Affichage erreur avec le composant snackbar */}
      {hasError && (
        <div>
          {[userError, activityError, performanceError, averageSessionsError]
            .filter((error) => error)
            .map((error, index) => (
              <Snackbar
                key={index}
                message={`Erreur : ${
                  typeof error === "string" ? error : "Erreur inconnue"
                }`}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
