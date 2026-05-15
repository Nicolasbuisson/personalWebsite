import { Footer } from "@/components/footer/footer";
import styles from "./page.module.css";
import { HomeHero } from "@/components/homeHero/homeHero";
import { WorkPreview } from "@/components/workPreview/workPreview";
import { Description } from "@/components/description/description";

export default function Home() {
  return (
    <div className={styles.page}>
      <HomeHero />
      <section className={styles.aboutSection}>
        <Description />
      </section>
      <WorkPreview />
      <Footer />
    </div>
  );
}
