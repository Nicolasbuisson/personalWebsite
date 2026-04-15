import { SlidingText } from "../slidingText/slidingText";
import styles from "./homeHero.module.css";

export const HomeHero = () => {
  return (
    <main className={styles.main}>
      <SlidingText />
    </main>
  );
};
