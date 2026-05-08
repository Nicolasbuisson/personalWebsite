"use client";
import styles from "./footer.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Copyright } from "../copyright/copyright";
import { Socials } from "../socials/socials";
import { FlipLink } from "../flipLink/flipLink";
import { Button } from "../button/button";
import { Time } from "../time/time";

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
  // maybe don't need footer to be 100vh???
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
          <div className={styles.footerCTA}>
            <h1>
              Let's Work<br></br>Together
            </h1>
            <div className={styles.footerCTAButtons}>
              <Button>nicolas.buisson@mail.mcgill.ca</Button>
              <Button>+1 514-649-9611</Button>
            </div>
          </div>
          <hr className={styles.footerLine} />
          <Copyright />
          <hr className={styles.footerLine} />
          <div className={styles.footerContent}>
            <div className={styles.footerContentColumn}>
              <h4>Navigation</h4>
              <div className={styles.footerNav}>
                <FlipLink href="/" label="Home" />
                <FlipLink href="/work" label="Work" />
                <FlipLink href="/about" label="About" />
                <FlipLink href="/contact" label="Contact" />
              </div>
            </div>
            <div className={styles.footerContentColumn}>
              <h4>Based in</h4>
              <div>Montreal, Canada</div>
            </div>
            <div className={styles.footerContentColumn}>
              <h4>Local time</h4>
              <Time />
            </div>
            <div className={styles.footerContentColumn}>
              <h4>Socials</h4>
              <Socials />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
