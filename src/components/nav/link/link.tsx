import styles from "./link.module.css";
import { motion, Variants } from "framer-motion";
import { FlipLink } from "@/components/flipLink/flipLink";

interface IProps {
  framerMotionExitAnimationKey: string;
  data: any;
  isActive: boolean;
  setSelectedIndicator: React.Dispatch<React.SetStateAction<string>>;
}

const slide: Variants = {
  initial: { x: 80 },
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

export const NavLink = (props: IProps) => {
  const { framerMotionExitAnimationKey, data, isActive, setSelectedIndicator } =
    props;
  const { title, href, index } = data;

  return (
    <motion.div
      key={framerMotionExitAnimationKey}
      className={styles.link}
      onMouseEnter={() => {
        setSelectedIndicator(href);
      }}
      custom={index}
      variants={slide}
      initial="initial"
      animate="enter"
      exit="exit"
    >
      <motion.div
        key={framerMotionExitAnimationKey + "-indicator"}
        variants={scale}
        animate={isActive ? "open" : "closed"}
        className={styles.indicator}
      ></motion.div>
      <FlipLink href={href} label={title} />
    </motion.div>
  );
};
