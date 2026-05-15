"use client";
import styles from "./description.module.css";
import { useInView, motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "../button/button";
import Link from "next/link";

export const Description = () => {
  const text =
    "Helping brands stand out in the digital era. Together, we will build a unique solution to reflect your vision.";

  const description = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(description, { margin: "-150px", once: true });

  const { scrollYProgress } = useScroll({
    target: description,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["70%", "-70%"]);

  const opacity = {
    initial: {
      opacity: 0,
    },
    open: {
      opacity: 1,
      transition: { duration: 0.7 },
    },
    closed: {
      opacity: 0,
    },
  };

  const slideUp = {
    initial: {
      y: "100%",
    },
    open: (i: number) => ({
      y: 0,
      transition: { duration: 0.5, delay: 0.02 * i },
    }),
    closed: {
      y: "100%",
    },
  };

  return (
    <div ref={description} className={styles.description}>
      <div className={styles.body}>
        <p>
          {text.split(" ").map((word, index) => {
            return (
              <span key={"description-word-" + index} className={styles.mask}>
                <motion.span
                  variants={slideUp}
                  custom={index}
                  animate={isInView ? "open" : "closed"}
                  className={
                    word === "stand" ||
                    word === "out" ||
                    word === "unique" ||
                    word === "vision."
                      ? styles.textGradient
                      : ""
                  }
                >
                  {word}
                </motion.span>
              </span>
            );
          })}
        </p>

        <div className={styles.aboutMeContainer}>
          <motion.p variants={opacity} animate={isInView ? "open" : "closed"}>
            The combination of my passion for code & design allows me to create
            unique custom solutions enabling my clients to{" "}
            <span className={styles.textGradient}>be memorable</span>.
          </motion.p>
          <motion.div style={{ y }}>
            <Link href="/about">
              <Button className={styles.button}>
                <p>About me</p>
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
