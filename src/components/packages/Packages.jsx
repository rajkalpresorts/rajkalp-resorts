import React from "react";
import styles from "./packages.module.css";
import pack from "./../../../public/assets/rajkalp/package.png";
import Image from "next/image";
import Link from "next/link";

const Packages = () => {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.head}>Membership Packages & Incentive Plan</div>
        <div className={styles.desc}>
          Welcome to the epitome of luxury living and unparalleled rewards! At
          our resort, we don't just offer exceptional hospitality; we invite you
          to become a part of our exclusive membership program, where every stay
          is an unforgettable experience and every referral brings you closer to
          a life of abundance.
          <br />
          <br />
          Step into a world where leisure meets opulence, where every moment is
          crafted to perfection, and where your journey towards financial
          freedom begins. Our membership packages are designed to elevate your
          travel experiences, offering you the opportunity to indulge in the
          serenity of Rajkalp Resorts - nestled amidst the breathtaking
          landscapes of Tadoba, one of India's most cherished tourist
          destinations.
        </div>
        <Link href="/#footer">
          <div className={styles.heroBtn}>GET STARTED</div>
        </Link>
      </div>
      <div className={styles.col2}>
        <Image
          src={pack}
          alt="img"
          className={styles.packImg}
          width={1000}
          placeholder="blur"
        />
      </div>
    </div>
  );
};

export default Packages;
