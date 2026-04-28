import { Footer } from "@/components/footer/footer";
import styles from "./page.module.css";
import { ThemeButton } from "@/components/themeButton/themeButton";
import { HomeHero } from "@/components/homeHero/homeHero";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeHero />
      {/* <main className={styles.main}>
        <ThemeButton />
        
      </main> */}
      <div style={{ backgroundColor: "rebeccapurple", height: "100vh" }}></div>
      <Footer />
    </div>
  );
}
