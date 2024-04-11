import React from "react";
import styles from "./shopBtn.module.css";
import Link from "next/link";

function ShopBtn() {
  return (
    <>
      <center>
        <Link href="https://majesticsecurity.in/" target="_blank">
          <button className={styles.shopBtn}>Shop Now →</button>
        </Link>
      </center>
    </>
  );
}

export default ShopBtn;
