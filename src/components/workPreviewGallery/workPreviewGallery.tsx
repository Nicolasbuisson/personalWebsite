import { MotionValue } from "motion";
import styles from "./workPreviewGallery.module.css";
import Image from "next/image";
import { motion } from "framer-motion";
import { WorkPreviewDetails } from "../workPreviewDetails/workPreviewDetails";
import { EXIT_INSTANTLY } from "@/utils/motion";

interface IWorkPreviewGalleryProps {
  backgroundImageUrl: string;
  alt: string;
  vignetteImageUrl: string;
  mousePosition: { x: MotionValue<number>; y: MotionValue<number> };
  isVignetteVisible: boolean;
  client: string;
  location: string;
  description: string;
  services: string[];
  websiteUrl: string;
}

export const WorkPreviewGallery = (props: IWorkPreviewGalleryProps) => {
  const {
    backgroundImageUrl,
    alt,
    vignetteImageUrl,
    mousePosition,
    isVignetteVisible,
    client,
    location,
    description,
    services,
    websiteUrl,
  } = props;

  const { x, y } = mousePosition;

  return (
    <div className={styles.gallery}>
      <div className={styles.galleryImageContainer}>
        <Image src={backgroundImageUrl} alt={alt} fill />
        <WorkPreviewDetails
          client={client}
          location={location}
          description={description}
          services={services}
          websiteUrl={websiteUrl}
        />
      </div>
      <motion.div
        className={styles.vignette}
        style={{ x, y }}
        animate={{ opacity: isVignetteVisible ? 1 : 0 }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
        exit={EXIT_INSTANTLY}
      >
        <Image src={vignetteImageUrl} alt={"Vignette for " + alt} fill />
      </motion.div>
    </div>
  );
};
