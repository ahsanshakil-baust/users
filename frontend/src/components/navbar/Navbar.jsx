import React, { useState, useEffect } from "react";
import Lists from "./Lists";
import Logo from "./Logo";
import styles from "../../css/modules/Navbar.module.css";
import ToggleBar from "./ToggleBar";

const Navbar = () => {
    const [style, setStyle] = useState("");
    const [toggle, setToggle] = useState("");
    const [close, setClose] = useState(styles.toggleBar);

    const handleScroll = () => {
        window.scrollY > 30 ? setStyle(styles.scroll) : setStyle("");
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleToggle = () => {
        toggle === styles.toggleNav
            ? setToggle("")
            : setToggle(styles.toggleNav);

        toggle === styles.toggleNav
            ? document.body.classList.remove("hideHoriz")
            : document.body.classList.add("hideHoriz");

        toggle === styles.toggleNav
            ? setClose(styles.toggleBar)
            : setClose(styles.close);
    };

    return (
        <nav className={`${styles.navDiv} ${style} ${toggle}`}>
            <Logo logo={styles.logo} />
            <ToggleBar classes={close} onClick={handleToggle} />
            <Lists
                hideNav={handleToggle}
                list={styles.lists}
                active={styles.active}
                activeSignup={styles.activeSignup}
                activeLogin={styles.activeLogin}
            />
        </nav>
    );
};

export default Navbar;
