"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import axios from "axios";

function Layout({ children }) {
  const handleRefresh = () => {
    window.location.reload();
  };

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

  return (
    <>
      <div className={styles.nav}>
        <div className={styles.col1}>
          <Link href="/admin/dashboard/form">
            <button className={styles.formBtn}>Form Data</button>
          </Link>
          <Link href="/admin/dashboard/newsletter">
            <button className={styles.newsBtn}>Newsletter</button>
          </Link>
        </div>

        <div className={styles.col2}>
          <button onClick={handleRefresh} className={styles.refreshBtn}>
            Refresh
          </button>
          <button onClick={handleLogout} className={styles.signoutBtn}>
            Signout
          </button>
        </div>
      </div>
      {children}
    </>
  );
}

export default Layout;
