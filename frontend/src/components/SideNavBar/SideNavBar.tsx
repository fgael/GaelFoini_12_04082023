import SideNavBarIcon from "../SideNavBarIcon/SideNavBarIcon";
import styles from "./SideNavBar.module.scss";

import yogaIcon from "../../assets/icons/yoga.png";
import swimIcon from "../../assets/icons/swim.png";
import bicycleIcon from "../../assets/icons/bicycle.png";
import dumbbellIcon from "../../assets/icons/dumbbell.png";

const SideNavBar = () => {
  return (
    <div className={styles.sideNavBarWrapper}>
      <div className={styles.sideNavBarContainer}>
        <div className={styles.iconContainer}>
          <SideNavBarIcon icon={yogaIcon} />
          <SideNavBarIcon icon={swimIcon} />
          <SideNavBarIcon icon={bicycleIcon} />
          <SideNavBarIcon icon={dumbbellIcon} />
        </div>
        <div className={styles.copyright}>Copyright, SportSee 2020</div>
      </div>
    </div>
  );
};

export default SideNavBar;
