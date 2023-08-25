import SideNavBarIcon from "../SideNavBarIcon/SideNavBarIcon";
import styles from "./SideNavBar.module.scss";

import iconZen from "../../assets/icons/icone-zen.png";
import iconNage from "../../assets/icons/icone-nage.png";
import iconVelo from "../../assets/icons/icone-velo.png";
import iconHaltere from "../../assets/icons/icone-haltere.png";

const SideNavBar = () => {
  return (
    <div className={styles.sideNavBarContainer}>
      <div className={styles.iconContainer}>
        <SideNavBarIcon icon={iconZen} />
        <SideNavBarIcon icon={iconNage} />
        <SideNavBarIcon icon={iconVelo} />
        <SideNavBarIcon icon={iconHaltere} />
      </div>
      <div className={styles.copyright}>Copyright, SportSee 2020</div>
    </div>
  );
};

export default SideNavBar;
