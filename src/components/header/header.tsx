"use client";
import { useLayoutEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { AnimatePresence } from "framer-motion";
import { Nav } from "../nav/nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const burger = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(burger.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        start: 0,
        end: window.innerHeight,
        onLeave: () => {
          gsap.to(burger.current, {
            scale: 1,
            duration: 0.25,
            ease: "power1.out",
          });
        },
        onEnterBack: () => {
          gsap.to(burger.current, {
            scale: 0,
            duration: 0.25,
            ease: "power1.out",
          });
        },
      },
    });
  }, []);

  return (
    <>
      <div ref={burger} className={styles.header}>
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
