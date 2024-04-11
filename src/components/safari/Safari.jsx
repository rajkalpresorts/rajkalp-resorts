import React from "react";
import styles from "./safari.module.css";
import Image from "next/image";
import tiger from "./../../../public/assets/rajkalp/tiger.png";
import jungle from "./../../../public/assets/rajkalp/jungle.png";

function Safari() {
  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <Image
          src={tiger}
          alt="img"
          className={styles.tigerImg}
          width={1000}
          placeholder="blur"
        />
        <div className={styles.heada}>
          We offer three distinct natural habitats <br /> that serve as genuine
          tributes to the <br /> wonders of our wilderness. A nature <br />{" "}
          walker's journey begins with each step <br /> into the great outdoors.
        </div>
        <div className={styles.desc3}>NATURE WALK</div>
      </div>
      <div className={styles.col2}>
        <div className={styles.desc}>JUNGLE SAFARI</div>
        <div className={styles.head}>
          Where the guides <br /> and naturalists work <br /> together to create
          an <br /> unforgettable safari <br /> experience.
        </div>
        <Image
          src={jungle}
          alt="img"
          className={styles.jungleImg}
          width={1000}
          placeholder="blur"
        />
      </div>
    </div>
  );
}

export default Safari;
