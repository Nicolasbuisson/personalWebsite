import styles from "./page.module.css";
import { ThemeButton } from "@/components/themeButton/themeButton";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <ThemeButton/>
        <div>
          <h1>To get started, edit the page.tsx file.</h1>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iusto corrupti ipsa alias a distinctio animi, dolores repudiandae, dolor minus saepe, minima quibusdam vel ipsam! Sed cum labore ullam molestiae eius!
          </p>
        </div>
      </main>
    </div>
  );
}
