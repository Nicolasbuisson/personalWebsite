"use client";
import { useState } from "react";
import styles from "./header.module.css";
import { AnimatePresence } from "framer-motion";
import { Nav } from "../nav/nav";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className={styles.header}>
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className={styles.button}
        >
          <div
            className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}
          ></div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <Nav framerMotionExitAnimKey="key-to-animate-exit-transition-framer" />
        )}
      </AnimatePresence>
    </>
  );
};
