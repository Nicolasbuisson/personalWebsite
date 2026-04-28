import { Copyright } from "../copyright/copyright";
import { FlipLink } from "../flipLink/flipLink";
import { Header } from "../header/header";
import { SlidingText } from "../slidingText/slidingText";
import styles from "./homeHero.module.css";

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

export const HomeHero = () => {
  return (
    <main className={styles.main}>
      <Header />
      <nav className={styles.nav}>
        <Copyright />
        <ul>
          {navItems.map((item) => {
            return (
              <li key={item.title}>
                <FlipLink href={item.href} label={item.title} />
                <div className={styles.indicator} />
              </li>
            );
          })}
        </ul>
      </nav>
      <SlidingText />
    </main>
  );
};
