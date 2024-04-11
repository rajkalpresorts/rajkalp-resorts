"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import axios from "axios";
import Image from "next/image";
import logo from "./../../../public/assets/rajkalp/logo2.png";
import Footer from "@/components/footer/Footer";

function Layout({ children }) {
  const [verified, setVerified] = useState(false);

  const router = useRouter();

  const path = usePathname();

  const handleLogout = () => {
    try {
      axios.get("/api/auth/logout");
      router.push("/");
      alert("You were logged out!");
    } catch (err) {
      console.log("Some error occured!");
      alert("Unable to logout, try after a minute.");
    }
  };

  const handleRefresh = () => {
    window.location.reload();
  };

  // useEffect(() => {
  //   const verifyToken = () => {
  //     setVerified(false);
  //     try {
  //       axios.get("/api/auth/verify-token");
  //       setVerified(true);
  //     } catch (error) {
  //       setVerified(false);
  //       router.push("/admin/login");
  //     }
  //   };

  //   verifyToken();
  // }, []);

  // if (!verified) {
  //   return <Loader />;
  // }

  return (
    <>
      <div className={styles.nav}>
        <Image
          src={logo}
          alt="img"
          className={styles.logo}
          width={600}
          height="auto"
        />
        <button onClick={handleLogout} className={styles.signout}>
          Signout
        </button>
      </div>
      <div className={styles.ribbon}>
        <Link href="/user" className={styles.ribs}>
          <button
            className={path === "/user" ? styles.butActive : styles.ribbonBtn}
          >
            Welcome Letter
          </button>
        </Link>
        <Link href="/user/profile" className={styles.ribs}>
          <button
            className={
              path === "/user/profile" ? styles.butActive : styles.ribbonBtn
            }
          >
            Profile
          </button>
        </Link>
        <Link href="/user/tree" className={styles.ribs}>
          <button
            className={
              path === "/user/tree" ? styles.butActive : styles.ribbonBtn
            }
          >
            View Tree
          </button>
        </Link>
        <Link href="/user/commission" className={styles.ribs}>
          <button
            className={
              path === "/user/commission" ? styles.butActive : styles.ribbonBtn
            }
          >
            Commission
          </button>
        </Link>
        <Link href="/user/referral" className={styles.ribs}>
          <button
            className={
              path === "/user/referral" ? styles.butActive : styles.ribbonBtn
            }
          >
            Get Your Referral ID
          </button>
        </Link>
      </div>
      {children}
      <Footer />
    </>
  );
}

export default Layout;
