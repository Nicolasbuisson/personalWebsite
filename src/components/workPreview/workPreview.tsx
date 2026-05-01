"use client";
import styles from "./workPreview.module.css";
import { WorkPreviewGallery } from "../workPreviewGallery/workPreviewGallery";
import { useSpring } from "motion/react";

export const WorkPreview = () => {
  // do each work section full screen width and height + add some glassmorphism cards on top for description
  // Project name, description, tags (Ecommerce, landing page...), view site button
  // vignette should be a picture of the site different from home hero used as background

  const springAttributes = {
    stiffness: 200,
    damping: 10,
    mass: 0.1,
  };

  const mousePosition = {
    x: useSpring(0, springAttributes),
    y: useSpring(0, springAttributes),
  };

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const targetX = clientX - (window.innerWidth * 0.25) / 2;
    const targetY = clientY - (window.innerHeight * 0.3) / 2;
    mousePosition.x.set(targetX);
    mousePosition.y.set(targetY);
  };

  return (
    <section className={styles.workPreviewSection} onMouseMove={mouseMove}>
      <WorkPreviewGallery
        backgroundImageUrl={"/images/palmTrees.jpg"}
        alt={""}
        vignetteImageUrl="/images/wine.jpg"
        mousePosition={mousePosition}
      />
      <WorkPreviewGallery
        backgroundImageUrl={"/images/drone.jpg"}
        alt={""}
        vignetteImageUrl="/images/path.jpg"
        mousePosition={mousePosition}
      />
    </section>
  );
};
