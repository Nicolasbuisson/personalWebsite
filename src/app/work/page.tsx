import styles from "./page.module.css";
import { ProjectGallery } from "@/components/projectGallery/projectGallery";

export default function Work() {
  return (
    <div className={styles.projectGalleryContainer}>
      <ProjectGallery />
    </div>
  );
}
