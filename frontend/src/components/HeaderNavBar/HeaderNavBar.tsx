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
        <li>
          <a href="/">Accueil</a>
        </li>
        <li>
          <a href="/about">Profil</a>
        </li>
        <li>
          <a href="/services">Réglage</a>
        </li>
        <li>
          <a href="/contact">Communauté</a>
        </li>
      </ul>
    </nav>
  );
};

export default HeaderNavBar;
