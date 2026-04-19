import { Footer } from "@/components/footer/footer";
import styles from "./page.module.css";
import { ThemeButton } from "@/components/themeButton/themeButton";
import { HomeHero } from "@/components/homeHero/homeHero";
import { Header } from "@/components/header/header";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <HomeHero />
      {/* <main className={styles.main}>
        <ThemeButton />
        
      </main> */}
      <Footer />
    </div>
  );
}
