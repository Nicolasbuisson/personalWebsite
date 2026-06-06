import styles from "./nav.module.css";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useRouter } from "next/router";
import { Curve } from "./curve/curve";
import { NavLink } from "./link/link";

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
  framerMotionExitAnimKey: string;
}

export const Nav = (props: IProps) => {
  const { framerMotionExitAnimKey } = props;
  const router = useRouter();
  const pathname = router.route;
  const [selectedIndicator, setSelectedIndicator] = useState(pathname);

  return (
    <motion.div
      key={framerMotionExitAnimKey}
      variants={menuSlide}
      initial="initial"
      animate="enter"
      exit="exit"
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
                framerMotionExitAnimationKey={`navlink-${data.title}`}
                data={{ ...data, index }}
                isActive={selectedIndicator == data.href}
                setSelectedIndicator={setSelectedIndicator}
              ></NavLink>
            );
          })}
        </div>
      </div>
      <Curve />
    </motion.div>
  );
};
