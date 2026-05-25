import { Header } from "@/components/header/header";
import styles from "./page.module.css";
import { ProjectGallery } from "@/components/projectGallery/projectGallery";

export default function Work() {
  return (
    <div className={styles.workPage}>
      <Header />
      <div className={styles.projectGalleryContainer}>
        <ProjectGallery />
      </div>
    </div>
  );
}
