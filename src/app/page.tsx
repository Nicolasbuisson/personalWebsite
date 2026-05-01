import { Footer } from "@/components/footer/footer";
import styles from "./page.module.css";
import { ThemeButton } from "@/components/themeButton/themeButton";
import { HomeHero } from "@/components/homeHero/homeHero";
import { WorkPreview } from "@/components/workPreview/workPreview";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeHero />
      {/* <main className={styles.main}>
        <ThemeButton />
      </main> */}
      <WorkPreview />
      <Footer />
    </div>
  );
}
