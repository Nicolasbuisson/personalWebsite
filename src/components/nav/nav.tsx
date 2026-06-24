import styles from "./nav.module.css";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { Curve } from "./curve/curve";
import { NavLink } from "./link/link";
import { ThemeButton } from "@/components/themeButton/themeButton";
// want to add the theme here? does the website need a theme?
// might as well show off

const navItems = [
  {
    title: "Home",
    href: "/",
  },
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

const menuSlide: Variants = {
  initial: { x: "calc(100% + 100px)" },
  enter: { x: "0", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
  exit: {
    x: "calc(100% + 100px)",
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
  },
};

interface IProps {
  isOpen: boolean;
}

export const Nav = ({ isOpen }: IProps) => {
  const router = useRouter();
  const pathname = router.route;
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      variants={menuSlide}
      initial={false}
      animate={isOpen ? "enter" : "exit"}
      className={styles.menu}
    >
      <div className={styles.body}>
        <div
          onMouseLeave={() => {
            setSelectedIndicator(pathname);
          }}
          className={styles.nav}
        >
          <div className={styles.header}>
            <p>Navigation</p>
          </div>
          {navItems.map((data, index) => {
            return (
              <NavLink
                key={index}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                isOpen={isOpen}
                setSelectedIndicator={setSelectedIndicator}
              />
            );
          })}
        </div>
      </div>
      <Curve isOpen={isOpen} />
    </motion.div>
  );
};
