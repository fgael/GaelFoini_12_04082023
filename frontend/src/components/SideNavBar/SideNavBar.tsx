import SideNavBarIcon from "../SideNavBarIcon/SideNavBarIcon";
import styles from "./SideNavBar.module.scss";

import zenIcon from "../../assets/icons/icone-zen.png";
import swimIcon from "../../assets/icons/icone-nage.png";
import bicycleIcon from "../../assets/icons/icone-velo.png";
import dumbbellIcon from "../../assets/icons/icone-haltere.png";

const SideNavBar = () => {
  return (
    <div className={styles.sideNavBarWrapper}>
      <div className={styles.sideNavBarContainer}>
        <div className={styles.iconContainer}>
          <SideNavBarIcon icon={zenIcon} />
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
