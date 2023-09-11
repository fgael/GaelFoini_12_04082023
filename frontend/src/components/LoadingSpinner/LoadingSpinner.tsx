import React from "react";
import styles from "./LoadingSpinner.module.scss";

const LoadingSpinner: React.FC = () => {
  return (
    <div className={styles.loadingSpinner}>
      <span className={styles.loader}></span>
    </div>
  );
};

export default LoadingSpinner;
