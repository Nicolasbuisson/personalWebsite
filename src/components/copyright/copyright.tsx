import styles from "./copyright.module.css";
import { PageTransitionLink } from "../pageTransition/pageTransitionLink";

interface ICopyrightProps {
  fullScreenWidth?: boolean;
}

export const Copyright = (props: ICopyrightProps) => {
  const { fullScreenWidth = false } = props;
  return (
    <PageTransitionLink
      href="/"
      className={`${styles.logo} ${fullScreenWidth ? styles.fullScreenWidth : ""}`}
    >
      <p className={styles.copyright}>©</p>
      <div className={styles.name}>
        <p className={styles.codeBy}>Code by&nbsp;</p>
        <p className={styles.nico}>Nico</p>
        <p className={styles.buisson}>las Buisson</p>
      </div>
    </PageTransitionLink>
  );
};
