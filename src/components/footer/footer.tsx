"use client";
import Link from "next/link";
import styles from "./footer.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Copyright } from "../copyright/copyright";

export const Footer = () => {
  const footerContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "start start"],
  });

  // 0.9 here must match css variable: --footer-height
  // else scroll won't match up
  const circleHeight = useTransform(scrollYProgress, [0, 0.9], [50, 0]);

  return (
    <div className={styles.footerContainer} ref={footerContainerRef}>
      <motion.div
        style={{ height: circleHeight }}
        className={styles.footerCircleContainer}
      >
        <div className={styles.footerCircle}></div>
      </motion.div>
      <div className={styles.footerClipPathContainer}>
        <footer className={styles.footer}>
          <div className={styles.footerContent}>
            <div className={styles.footerContentColumn}>
              <h4>Navigation</h4>
              <Link href="/about">About</Link>
              <Link href="/work">Work</Link>
            </div>
            <div className={styles.footerContentColumn}>
              <h4>Contact</h4>
              <a>nicolas.buisson@mail.mcgill.ca</a>
              <span>More info</span>
            </div>
          </div>
          <Copyright />
        </footer>
      </div>
    </div>
  );
};
