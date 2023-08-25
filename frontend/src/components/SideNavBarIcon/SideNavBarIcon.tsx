import styles from "./SideNavBarIcon.module.scss";

interface IconProps {
  icon: string;
}

const SideNavBarIcon: React.FC<IconProps> = ({ icon }) => {
  return (
    <div className={styles.sideNavBarIconContainer}>
      <img src={icon} alt="Icône" />
    </div>
  );
};

export default SideNavBarIcon;
