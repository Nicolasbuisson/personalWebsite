"use client";
import styles from "./footer.module.css";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { Copyright } from "../copyright/copyright";
import { Socials } from "../socials/socials";
import { Button } from "../button/button";
import { Time } from "../time/time";
import Image from "next/image";
import Link from "next/link";
import { EXIT_INSTANTLY } from "@/utils/motion";

export const Footer = () => {
  const footerContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: footerContainerRef,
    offset: ["start end", "start start"],
  });

  // 0.9 or 1 here must match css variable: --footer-height/--footer-container-height else scroll won't match up
  // make circle the same background as the previous section
  // look for footer inspo online...
  // maybe don't need footer to be 100vh???
  const circleHeight = useTransform(scrollYProgress, [0, 1], [50, 0]);
  // Dennis has a button that leads to contact page, which then shows a form...
  // probably want to do the same
  // create codebynico email address after buying the domain: info@codebynico.ca?
  return (
    <div className={styles.footerContainer} ref={footerContainerRef}>
      <motion.div
        style={{ height: circleHeight }}
        className={styles.footerCircleContainer}
        exit={EXIT_INSTANTLY}
      >
        <div className={styles.footerCircle}></div>
      </motion.div>
      <div className={styles.footerClipPathContainer}>
        <div className={styles.footerStickyContainer}>
          <footer className={styles.footerSticky}>
            <div className={styles.footerCTA}>
              <div className={styles.footerCTAPictureContainer}>
                <Image
                  src={"/images/drone.jpg"}
                  alt="Nicolas profile picture"
                  height={80}
                  width={80}
                  className={styles.profilePicture}
                />
                <h1>Let's Work</h1>
              </div>
              <h1>Together</h1>
              <div className={styles.footerCTAButtons}>
                <a href="mailto:nicolas.buisson@mail.mcgill.ca">
                  <Button>nicolas.buisson@mail.mcgill.ca</Button>
                </a>
                <a href="tel:+15146499611">
                  <Button>+1 514-649-9611</Button>
                </a>
              </div>
            </div>
            <hr className={styles.footerLine} />
            <div className={styles.copyrightContainer}>
              <Copyright fullScreenWidth />
            </div>
            <hr className={styles.footerLine} />
            <div className={styles.footerContent}>
              <div className={styles.footerContentColumn}>
                <h4>Navigation</h4>
                <div className={styles.footerNav}>
                  <Link href="/">Home</Link>
                  <Link href="/work">Work</Link>
                  <Link href="/about">About</Link>
                  <Link href="/contact">Contact</Link>
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
    </div>
  );
};
