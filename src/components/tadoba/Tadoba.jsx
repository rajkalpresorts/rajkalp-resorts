import React from "react";
import styles from "./tadoba.module.css";
import Image from "next/image";

const Tadoba = () => {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.head}>About Tadoba</div>
      </div>
      <div className={styles.col2}>
        <div className={styles.desc}>
          Nestled in the heart of Maharashtra, Tadoba Andhari National Reserve
          beckons with its untamed beauty and rich biodiversity. Embark on an
          unforgettable journey through dense forests and sprawling grasslands,
          where elusive tigers roam freely alongside a vibrant tapestry of
          wildlife.
        </div>
      </div>
      <div className={styles.col3}>
        <div className={styles.desc}>
          Explore the wilderness of Tadoba Andhari National Reserve, where every
          corner tells a story of ancient forests and thriving ecosystems.
          Traverse rugged terrain and witness majestic creatures in their
          natural habitat, from regal tigers to graceful deer.
        </div>
      </div>
    </div>
  );
};

export default Tadoba;
