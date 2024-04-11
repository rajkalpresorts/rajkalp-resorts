import React from "react";
import styles from "./experience.module.css";
import Image from "next/image";
import exp from "./../../../public/assets/rajkalp/experience.png";

function Experience() {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <div className={styles.desc}>EXPERIENCE</div>
        <div className={styles.head}>
          A unique, theatrical <br /> experience where <br /> each table is its
          own <br /> foodie experience.
        </div>
      </div>
      <div className={styles.col2}>
        <Image
          src={exp}
          alt="img"
          className={styles.expImg}
          width={1000}
          placeholder="blur"
        />
        <div className={styles.desc2}>
          A birdwatching adventure where every sight is a masterpiece of
          nature's canvas. We offer several serene settings in which you can
          immerse yourself in the beauty of avian life, accompanied by
          like-minded enthusiasts, Isn't that the true spirit of birdwatching?
        </div>
        <div className={styles.desc3}>
            BIRD WATCHING
        </div>
      </div>
      <div className={styles.col3}></div>
    </div>
  );
}

export default Experience;
