"use client";
import styles from "./workPreview.module.css";
import { WorkPreviewGallery } from "../workPreviewGallery/workPreviewGallery";
import { useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

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

  const [isVignetteVisible, setIsVignetteVisible] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  // cached so we don't run getComputedStyle on every mousemove
  const vignetteSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const readVignetteSize = () => {
      if (!sectionRef.current) return;
      const sectionStyles = getComputedStyle(sectionRef.current);
      vignetteSize.current = {
        width: parseFloat(sectionStyles.getPropertyValue("--vignette-width")),
        height: parseFloat(sectionStyles.getPropertyValue("--vignette-height")),
      };
    };

    readVignetteSize();
    window.addEventListener("resize", readVignetteSize);
    return () => window.removeEventListener("resize", readVignetteSize);
  }, []);

  const mouseMove = (e: any) => {
    const { clientX, clientY } = e;
    const { width, height } = vignetteSize.current;
    // centre the vignette on the cursor
    mousePosition.x.set(clientX - width / 2);
    mousePosition.y.set(clientY - height / 2);
  };

  return (
    <section
      ref={sectionRef}
      className={styles.workPreviewSection}
      onMouseMove={mouseMove}
      onMouseEnter={() => setIsVignetteVisible(true)}
      onMouseLeave={() => setIsVignetteVisible(false)}
    >
      <WorkPreviewGallery
        backgroundImageUrl={"/images/palmTrees.jpg"}
        alt={""}
        vignetteImageUrl="/images/wine.jpg"
        mousePosition={mousePosition}
        isVignetteVisible={isVignetteVisible}
        client="Alexon Media"
        location="Dubai, UAE"
        description="company website"
        services={["Landing Page"]}
        websiteUrl="https://www.alexonmedia.com"
      />
      <WorkPreviewGallery
        backgroundImageUrl={"/images/drone.jpg"}
        alt={""}
        vignetteImageUrl="/images/path.jpg"
        mousePosition={mousePosition}
        isVignetteVisible={isVignetteVisible}
        client="Gourmandique"
        location="Montreal, Canada"
        description="company website"
        services={["Ecommerce"]}
        websiteUrl="https://www.alexonmedia.com"
      />
    </section>
  );
};
