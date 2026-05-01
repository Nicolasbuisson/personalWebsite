import { MotionValue } from "motion";
import styles from "./workPreviewGallery.module.css";
import Image from "next/image";
import { motion } from "framer-motion";

interface IWorkPreviewGalleryProps {
  backgroundImageUrl: string;
  alt: string;
  vignetteImageUrl: string;
  mousePosition: { x: MotionValue<number>; y: MotionValue<number> };
}

export const WorkPreviewGallery = (props: IWorkPreviewGalleryProps) => {
  const { backgroundImageUrl, alt, vignetteImageUrl, mousePosition } = props;

  const { x, y } = mousePosition;

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryImageContainer}>
        <Image src={backgroundImageUrl} alt={alt} fill />
      </div>
      <motion.div className={styles.vignette} style={{ x, y }}>
        <Image src={vignetteImageUrl} alt={"Vignette for " + alt} fill />
      </motion.div>
    </div>
  );
};
