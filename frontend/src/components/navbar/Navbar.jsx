import React from "react";
import Lists from "./Lists";
import Logo from "./Logo";
import styles from "../../css/modules/Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navDiv}>
      <Logo logo={styles.logo} />
      <Lists list={styles.lists} active={styles.active} />
    </nav>
  );
};

export default Navbar;
