"use client";
import styles from "./projectGalleryModal.module.css";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import gsap from "gsap";
import { useEffect, useRef } from "react";

interface IProjectGalleryModalProps {
  modalState: ModalState;
  projects: IProjectGalleryItem[];
}

const scaleAnimation: Variants = {
  initial: {
    scale: 0,
    x: "calc(-50% - var(--project-gallery-padding-inline))",
    y: "calc(-50% - var(--project-gallery-padding-block)",
  },
  open: {
    scale: 1,
    x: "calc(-50% - var(--project-gallery-padding-inline))",
    y: "calc(-50% - var(--project-gallery-padding-block))",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  closed: {
    scale: 0,
    x: "calc(-50% - var(--project-gallery-padding-inline))",
    y: "calc(-50% - var(--project-gallery-padding-block))",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 1] },
  },
};

export const ProjectGalleryModal = (props: IProjectGalleryModalProps) => {
  const {
    modalState: { active, index },
    projects,
  } = props;

  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const moveContainerX = gsap.quickTo(containerRef.current, "left", {
      duration: 0.8,
      ease: "power.3",
    });
    const moveContainerY = gsap.quickTo(containerRef.current, "top", {
      duration: 0.8,
      ease: "power.3",
    });
    const moveCursorX = gsap.quickTo(cursorRef.current, "left", {
      duration: 0.5,
      ease: "power.3",
    });
    const moveCursorY = gsap.quickTo(cursorRef.current, "top", {
      duration: 0.5,
      ease: "power.3",
    });

    const modalEventListener = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      // account for scrollY when setting the modal's position
      moveContainerX(clientX);
      moveContainerY(clientY + window.scrollY);
      moveCursorX(clientX);
      moveCursorY(clientY + window.scrollY);
    };

    window.addEventListener("mousemove", modalEventListener);

    return () => window.removeEventListener("mousemove", modalEventListener);
  }, []);

  return (
    <>
      <motion.div
        ref={containerRef}
        className={styles.modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "open" : "closed"}
      >
        <div className={styles.modalSlider} style={{ top: `${index * -100}%` }}>
          {projects.map((project, index) => {
            return (
              <div
                key={project.title + "-modal"}
                className={styles.modal}
                style={{ backgroundColor: project.color }}
              >
                <Image
                  src={project.imageSrc}
                  height={300}
                  width={300}
                  alt="image"
                />
              </div>
            );
          })}
        </div>
      </motion.div>
      <motion.div
        ref={cursorRef}
        className={styles.cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "open" : "closed"}
      >
        View
      </motion.div>
    </>
  );
};
