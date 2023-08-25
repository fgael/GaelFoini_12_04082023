import styles from "./HomePage.module.scss";
import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <HeaderNavBar />
      <SideNavBar />
    </div>
  );
};

export default HomePage;
