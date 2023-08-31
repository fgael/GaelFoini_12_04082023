import { NavLink } from "react-router-dom";

import styles from "./HeaderNavBar.module.scss";
import SportSeeLogo from "../../assets/logo.png";

const HeaderNavBar = () => {
  return (
    <nav className={styles.headerNavBarContainer}>
      <div className={styles.logoContainer}>
        <img
          className={styles.logo}
          src={SportSeeLogo}
          alt="Logo de l'entreprise"
        />
        <div className={styles.companyName}>SportSee</div>
      </div>
      <ul className={styles.navList}>
        <NavLink to="/">
          <li>Accueil</li>
        </NavLink>
        <NavLink to="/profil">
          <li>Profil</li>
        </NavLink>
        <NavLink to="/settings">
          <li>Réglage</li>
        </NavLink>
        <NavLink to="/community">
          <li>Communauté</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default HeaderNavBar;
