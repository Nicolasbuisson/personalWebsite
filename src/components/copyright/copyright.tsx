import styles from "./copyright.module.css";

export const Copyright = () => {
  return (
    <a href="/" className={styles.logo}>
      <p className={styles.copyright}>©</p>
      <div className={styles.name}>
        <p className={styles.codeBy}>Code by&nbsp;</p>
        <p className={styles.nico}>Nico</p>
        <p className={styles.buisson}>las Buisson</p>
      </div>
    </a>
  );
};
