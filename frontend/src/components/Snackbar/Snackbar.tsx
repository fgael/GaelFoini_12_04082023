import React, { useState, useEffect } from "react";
import styles from "./Snackbar.module.scss";

interface SnackbarProps {
  message: string;
}

const Snackbar: React.FC<SnackbarProps> = ({ message }) => {
  const [showSnackbar, setShowSnackbar] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSnackbar(false);
    }, 10000);

    return () => {
      clearTimeout(timer);
    };
  });

  return (
    <div className={`${styles.snackbar} ${showSnackbar ? styles.show : ""}`}>
      {message}
    </div>
  );
};

export default Snackbar;
