"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import axios from "axios";
import Image from "next/image";
import Footer from "@/components/footer/Footer";

function Layout({ children }) {
  const [verified, setVerified] = useState(false);

  const router = useRouter();

  const path = usePathname();

  const handleLogout = () => {
    try {
      axios.get("/api/auth/logout");
      router.push("/admin/login");
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
      <div className={styles.contain}>
        <div className={styles.ribbon}>
          <Link href="/user/profile" className={styles.ribs}>
            <button
              className={
                path === "/user/profile" ? styles.butActive : styles.ribbonBtn
              }
            >
              Edit Profile
            </button>
          </Link>
          <Link href="/user/profile/payment" className={styles.ribs}>
            <button
              disabled
              className={
                path === "/user/profile/payment"
                  ? styles.butActive
                  : styles.ribbonBtn
              }
            >
              Payment
            </button>
          </Link>
          <Link href="/user/profile/notification" className={styles.ribs}>
            <button
              disabled
              className={
                path === "/user/profile/notification"
                  ? styles.butActive
                  : styles.ribbonBtn
              }
            >
              Notification
            </button>
          </Link>
          <Link href="/user/profile/security" className={styles.ribs}>
            <button
              disabled
              className={
                path === "/user/profile/security"
                  ? styles.butActive
                  : styles.ribbonBtn
              }
            >
              Security
            </button>
          </Link>
          <Link href="/user/profile/help" className={styles.ribs}>
            <button
              disabled
              className={
                path === "/user/profile/help"
                  ? styles.butActive
                  : styles.ribbonBtn
              }
            >
              Help
            </button>
          </Link>
        </div>
        <div className={styles.part2}>{children}</div>
      </div>
    </>
  );
}

export default Layout;
