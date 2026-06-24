"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./header.module.css";
import { Nav } from "../nav/nav";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Copyright } from "../copyright/copyright";
import { FlipLink } from "../flipLink/flipLink";
import { useLenis } from "lenis/react";

const navItems = [
  {
    title: "Work",
    href: "/work",
  },
  {
    title: "About",
    href: "/about",
  },
  {
    title: "Contact",
    href: "/contact",
  },
];

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [
    scrolledMoreThanWindowInnerHeight,
    setScrolledMoreThanWindowInnerHeight,
  ] = useState<boolean>(false);

  const burger = useRef<HTMLDivElement>(null);

  const lenis = useLenis(); // to enable/disable scrolling

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const tween = gsap.to(burger.current, {
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
    () => {
      tween.kill();
      tween.scrollTrigger?.kill();
    };
  }, []);

  useEffect(() => {
    const updateScrolledMoreThanWindowInnerHeight = () => {
      setScrolledMoreThanWindowInnerHeight(
        document.documentElement.scrollTop >=
          document.documentElement.clientHeight,
      );
    };
    window.addEventListener("scroll", updateScrolledMoreThanWindowInnerHeight);
    () => {
      window.removeEventListener(
        "scroll",
        updateScrolledMoreThanWindowInnerHeight,
      );
    };
  }, []);

  return (
    <>
      <div ref={burger} className={styles.header}>
        <div
          onClick={() => {
            gsap.to(burger.current, {
              scale:
                isOpen && !scrolledMoreThanWindowInnerHeight
                  ? 0 // closing
                  : 1, // opening
              duration: 0.25,
              ease: "power1.out",
            });
            isOpen ? lenis?.start() : lenis?.stop();
            setIsOpen(!isOpen);
          }}
          className={styles.button}
        >
          <div
            className={`${styles.burger} ${isOpen ? styles.burgerActive : ""}`}
          ></div>
        </div>
      </div>
      <Nav isOpen={isOpen} />
      <nav className={styles.nav}>
        <Copyright />
        <li className={styles.menuLabel}>
          <FlipLink
            label={"Menu"}
            onClick={() => {
              // opening
              gsap.to(burger.current, {
                scale: 1,
                delay: 0.5,
                duration: 0.25,
                ease: "power1.out",
              });
              lenis?.stop();
              setIsOpen(!isOpen);
            }}
          />
          <div className={styles.indicator} />
        </li>
        <ul>
          {navItems.map((item) => {
            return (
              <li key={item.title} className={styles.headerNavLink}>
                <FlipLink href={item.href} label={item.title} />
                <div className={styles.indicator} />
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
