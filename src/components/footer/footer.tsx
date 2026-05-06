"use client";
import styles from "./footer.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Copyright } from "../copyright/copyright";
import { Socials } from "../socials/socials";
import { FlipLink } from "../flipLink/flipLink";

export const Footer = () => {
  const footerContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "start start"],
  });

  // 0.9 or 1 here must match css variable: --footer-height/--footer-container-height else scroll won't match up
  // make circle the same background as the previous section
  // look for footer inspo online...
  // maybe cool to have massive <Copyright> component be full screen width?
  // maybe don't need footer to be 100vh?
  const circleHeight = useTransform(scrollYProgress, [0, 1], [50, 0]);

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
              <FlipLink href="/" label="Home" />
              <FlipLink href="/work" label="Work" />
              <FlipLink href="/about" label="About" />
              <FlipLink href="/contact" label="Contact" />
            </div>
            <div className={styles.footerContentColumn}>
              <h4>Contact</h4>
              <FlipLink
                href="mailto:nicolas.buisson@mail.mcgill.ca"
                label="nicolas.buisson@mail.mcgill.ca"
              />
              <FlipLink href="tel:+15146499611" label="+1514-649-9611" />
            </div>
            <div className={styles.footerContentColumn}>
              <h4>Socials</h4>
              <Socials />
            </div>
          </div>
          <div className={styles.footerCTA}>
            <h1>Let's Work Together</h1>
          </div>
          <hr className={styles.footerLine} />
          <Copyright />
        </footer>
      </div>
    </div>
  );
};
