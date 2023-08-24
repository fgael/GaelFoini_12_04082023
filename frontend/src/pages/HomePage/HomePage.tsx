import styles from "./HomePage.module.scss"; // Importe le fichier de style CSS module

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <div className={styles.HomePage}>
        <h1>module scss</h1>
      </div>
    </div>
  );
};

export default HomePage;
