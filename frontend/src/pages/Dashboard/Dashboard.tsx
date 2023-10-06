import React from "react";
import { useUserInfo } from "../../hooks/useUserInfo";
import { useUserActivity } from "../../hooks/useUserActivity";
import { useUserPerformance } from "../../hooks/useUserPerformance";
import { useUserAverageSessions } from "../../hooks/useUserAverageSession";

// import module style
import styles from "./Dashboard.module.scss";

// import composant
import CardIcon from "../../components/CardIcon/CardIcon";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Snackbar from "../../components/Snackbar/Snackbar";

// import chart component
import ActivityBarChart from "../../components/Charts/ActivityBarChart";
import ScoreRadialBarChart from "../../components/Charts/ScoreRadialBarChart";
import PerformanceRadarChart from "../../components/Charts/PerformanceRadarChart";
import AverageSessionsLineChart from "../../components/Charts/AverageSessionsLineChart";

// import icones
import appleIcon from "../../assets/icons/apple.svg";
import cheeseburgerIcon from "../../assets/icons/cheeseburger.svg";
import chickenIcon from "../../assets/icons/chicken.svg";
import energyIcon from "../../assets/icons/energy.svg";

const Dashboard: React.FC = () => {
  const { user, loading: userLoading, error: userError } = useUserInfo(18);

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

  const isLoading =
    (userLoading ||
      activityLoading ||
      performanceLoading ||
      averageSessionsLoading) &&
    !userError?.message &&
    !activityError?.message &&
    !performanceError?.message &&
    !averageSessionsError?.message;

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const hasUserData =
    user &&
    userActivity &&
    userPerformance &&
    userAverageSessions &&
    !userError &&
    !activityError &&
    !performanceError &&
    !averageSessionsError;

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
            {/* Partie de gauche */}
            <div className="flex flex-col grow justify-between gap-4 lg:gap-8 w-9/12 lg:w-10/12">
              <div className="bg-gray-50 p-4 rounded-lg">
                <ActivityBarChart userActivity={userActivity} />
              </div>
              <div className="grid grid-cols-12 gap-4 lg:gap-8">
                <div className="col-span-4">
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

            {/* Partie de droite */}
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
      {hasError && (
        <div>
          {[userError, activityError]
            .filter((error) => error)
            .map((error, index) => (
              <Snackbar key={index} message={`Erreur : ${error.message}`} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
