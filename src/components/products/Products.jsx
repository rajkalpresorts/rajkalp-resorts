import React from "react";
import styles from "./products.module.css";
import cam1 from "./../../../public/assets/rajkalp/am1.png";
import cam2 from "./../../../public/assets/rajkalp/am2.png";
import cam3 from "./../../../public/assets/rajkalp/am3.png";
import cam4 from "./../../../public/assets/rajkalp/am4.png";
import ic1 from "./../../../public/assets/rajkalp/ic1.png";
import ic2 from "./../../../public/assets/rajkalp/ic2.png";
import ic3 from "./../../../public/assets/rajkalp/ic3.png";
import ic4 from "./../../../public/assets/rajkalp/ic4.png";
import Image from "next/image";
import Link from "next/link";

const Products = () => {
  return (
    <div className={styles.container} id="products">
      <div className={styles.head}>AMNITIES</div>
      <div className={styles.cards}>
        <div className={styles.amCard}>
          <Image
            src={cam4}
            placeholder="blur"
            width={1000}
            className={styles.amImg}
            alt="img"
          />
          <div className={styles.cardItem}>
            <Image src={ic1} width={100} className={styles.icImg} alt="img" />
            <div className={styles.desc}>Accomodation</div>
            <div className={styles.detailHover}>
              Indulge in unparalleled luxury at Rajkalp Resorts - Tadoba, where
              every accommodation is meticulously designed to offer a harmonious
              blend of comfort and sophistication. Immerse yourself in opulent
              interiors, breathtaking views, and personalized service, ensuring
              an unforgettable retreat amidst the serenity of nature.
            </div>
          </div>
        </div>
        <div className={styles.amCard}>
          <Image
            src={cam3}
            placeholder="blur"
            width={1000}
            className={styles.amImg}
            alt="img"
          />
          <div className={styles.cardItem}>
            <Image src={ic2} width={100} className={styles.icImg} alt="img" />
            <div className={styles.desc}>Restaurant</div>
            <div className={styles.detailHover}>
              Savor exquisite culinary delights at our resort's restaurant,
              where every dish is a culinary masterpiece crafted from the
              freshest locally sourced ingredients. Whether indulging in
              traditional flavors or exploring innovative gastronomic creations,
              our restaurant promises a dining experience that tantalizes the
              senses and leaves a lasting impression of culinary excellence.
            </div>
          </div>
        </div>
        <div className={styles.amCard}>
          <Image
            src={cam2}
            placeholder="blur"
            width={1000}
            className={styles.amImg}
            alt="img"
          />
          <div className={styles.cardItem}>
            <Image src={ic3} width={100} className={styles.icImg} alt="img" />
            <div className={styles.desc}>Swimming Pool</div>
            <div className={styles.detailHover}>
              Embark on a journey of relaxation and rejuvenation with our
              resort's unparalleled amenities. From refreshing swimming pools
              and rejuvenating spa treatments to exciting recreational
              activities and exquisite dining options, every aspect of your stay
              is designed to elevate your experience and create cherished
              memories amidst the beauty of nature.
            </div>
          </div>
        </div>
        <div className={styles.amCard}>
          <Image
            src={cam1}
            placeholder="blur"
            width={1000}
            className={styles.amImg}
            alt="img"
          />
          <div className={styles.cardItem}>
            <Image src={ic4} width={100} className={styles.icImg} alt="img" />
            <div className={styles.desc}>Clubhouse</div>
            <div className={styles.detailHover}>
              Discover the heart of luxury and leisure at our resort's
              clubhouse. Offering a sanctuary of sophistication, it's a haven
              for relaxation and socializing. Immerse yourself in premium
              amenities, from fitness facilities to exclusive lounges, and
              elevate your stay to new heights of indulgence and enjoyment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
