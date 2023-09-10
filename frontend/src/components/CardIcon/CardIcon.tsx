import styles from "./CardIcon.module.scss";

interface IconProps {
  icon: string;
  color: string;
  title: string;
  content: string;
}

const CardIcon: React.FC<IconProps> = ({ icon, color, title, content }) => {
  const backgroundColorWithOpacity = `${color}1A`;

  return (
    <div className={styles.cardContainer}>
      <div
        className={styles.iconContainer}
        style={{ backgroundColor: backgroundColorWithOpacity }}
      >
        <img src={icon} alt="Icône" className={styles.cardImg} />
      </div>
      <div className={styles.contentContainer}>
        <p className={styles.content}>{content}</p>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default CardIcon;
