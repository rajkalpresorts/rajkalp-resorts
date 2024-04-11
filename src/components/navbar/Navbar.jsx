"use client";
import React, { useState } from "react";
import styles from "./navbar.module.css";
import Image from "next/image";
import logo from "./../../../public/assets/rajkalp/logo.png";
import hamburger from "./../../../public/assets/hamburger.png";
import Link from "next/link";
import ShopBtn from "../shopBtn/ShopBtn";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Link href={"/"}>
        <Image
          src={logo}
          className={styles.img}
          width={1000}
          style={{ height: "auto" }}
          placeholder="blur"
          alt="Logo"
        />
      </Link>
      <div className={styles.menu}>
        <Link className={styles.link} href="/">
          HOME
        </Link>
        <Link className={styles.link} href="/book-now">
          BOOK NOW
        </Link>
        <Link className={styles.link} href="/auth/login">
          LOGIN
        </Link>
      </div>
      <Image
        className={styles.hamburger}
        src={hamburger}
        width={1000}
        style={{ height: "auto" }}
        alt="Hamburger"
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className={styles.menu2}>
          <Link
            className={styles.link2}
            href="/#about"
            onClick={() => setOpen(!open)}
          >
            HOME
          </Link>
          <Link
            className={styles.link2}
            href="/book-now"
            onClick={() => setOpen(!open)}
          >
            BOOK NOW
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
