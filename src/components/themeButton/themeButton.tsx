'use client';
import styles from "./themeButton.module.css";
import { useState } from "react";

export const ThemeButton = () => {

    const [theme, setTheme] = useState<boolean>(true);

    const updateTheme = () => {
        if (theme) {
            // default light so make dark
            document.documentElement.style.setProperty('--theme', 'dark');
        } else {
            document.documentElement.style.setProperty('--theme', 'light');
        }
        setTheme(!theme);
    }

    const transitionView = () => {
        if (!document.startViewTransition) {
            updateTheme();
            return;
        }
        document.startViewTransition(() => {
            updateTheme();
        });
    }

    return <button className={styles.themeButton} onClick={transitionView}>Change Theme</button>

}