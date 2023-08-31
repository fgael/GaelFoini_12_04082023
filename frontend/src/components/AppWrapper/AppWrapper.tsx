import { ReactNode } from "react";

import HeaderNavBar from "../../components/HeaderNavBar/HeaderNavBar";
import SideNavBar from "../../components/SideNavBar/SideNavBar";

import styles from "./AppWraper.module.scss";

interface AppWrapperProps {
  children: ReactNode;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children }) => {
  return (
    <div className={styles.appWrapper}>
      <HeaderNavBar />
      <div className={styles.contentWrapper}>
        <SideNavBar />
        <main>{children}</main>
      </div>
    </div>
  );
};

export default AppWrapper;
