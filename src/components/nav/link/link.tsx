import styles from "./link.module.css";
import { motion, Variants } from "framer-motion";
import { FlipLink } from "@/components/flipLink/flipLink";
import { EXIT_INSTANTLY } from "@/utils/motion";

interface IProps {
  data: any;
  isActive: boolean;
  isOpen: boolean;
  setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>;
}

const slide: Variants = {
  enter: (i: number) => ({
    x: 0,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
  exit: (i: number) => ({
    x: 80,
    transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 * i },
  }),
};

const scale: Variants = {
  open: { scale: 1, transition: { duration: 0.3 } },
  closed: { scale: 0, transition: { duration: 0.4 } },
};

export const NavLink = ({
  data,
  isActive,
  isOpen,
  setSelectedIndicator,
}: IProps) => {
  const { title, href, index } = data;

  return (
    <motion.div
      className={styles.link}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial={false}
      animate={isOpen ? "enter" : "exit"}
    >
      <motion.div
        variants={scale}
        animate={isActive ? "open" : "closed"}
        exit={EXIT_INSTANTLY}
        className={styles.indicator}
      />
      <FlipLink href={href} label={title} />
    </motion.div>
  );
};
