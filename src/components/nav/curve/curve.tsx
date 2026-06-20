import styles from "./curve.module.css";
import { useEffect, useState } from "react";
import { motion, Variants } from "framer-motion";

export const Curve = ({ isOpen }: { isOpen: boolean }) => {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight);
  }, []);

  if (height === 0) return null;

  const initialPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q-100 ${height / 2} 100 0`;
  const targetPath = `M100 0 L200 0 L200 ${height} L100 ${height} Q100 ${height / 2} 100 0`;

  const curve: Variants = {
    enter: {
      d: targetPath,
      transition: { duration: 1, ease: [0.76, 0, 0.24, 1] },
    },
    exit: {
      d: initialPath,
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
    },
  };

  return (
    <svg className={styles.svgCurve}>
      <motion.path
        variants={curve}
        initial={false}
        animate={isOpen ? "enter" : "exit"}
      />
    </svg>
  );
};
