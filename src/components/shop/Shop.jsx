import React from "react";
import styles from "./shop.module.css";
import prod1 from "./../../../public/assets/prod1.png";
import prod2 from "./../../../public/assets/prod2.png";
import prod3 from "./../../../public/assets/prod3.png";
import prod4 from "./../../../public/assets/prod4.png";
import Image from "next/image";
import Link from "next/link";

const Shop = () => {
  const data = [
    {
      title: "Night Vision Camera",
      desc: "2MP IP FULL COLOR NIGHT VISION CAMERA- S-IP-D1-C-A",
      img: prod1,
      price: "Rs. 1,400.00",
      link: "https://majesticsecurity.in/product/2mp-ip-full-color-night-vision-camera-s-ip-d1-c-a/",
    },
    {
      title: "White light Dome",
      desc: "1/3″ Progressive CMOS, ICR, 2560×1440:25fps(P)/30fps(N)",
      img: prod2,
      price: "Rs. 3,339.00",
      link: "https://majesticsecurity.in/product/4mp-white-light-dome/",
    },
    {
      title: "Smart Wifi Cam",
      desc: "Smart WIFI 2MP PAN TILT CAMERA- S-PT10",
      img: prod3,
      price: "Rs. 1,200.00",
      link: "https://majesticsecurity.in/product/smart-wifi-2mp-pan-tilt-camera-s-pt10/",
    },
    {
      title: "Wireless video doorbell",
      desc: "Resolution 1080p Controller Type Google Assistant, Amazon Alexa",
      img: prod4,
      price: "Rs. 7,000.00",
      link: "https://majesticsecurity.in/product/wireless-video-doorbell/",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.head}>Shop Now</div>
      <div className={styles.cards}>
        {data.map((item, index) => (
          <div className={styles.card} key={index}>
            <Image
              src={item.img}
              className={styles.img}
              width={1500}
              style={{ height: "auto" }}
              placeholder="blur"
              alt="Product"
            />
            <div className={styles.info}>
              <div className={styles.title}>{item.title}</div>
              <div className={styles.desc}>{item.desc}</div>
              <div className={styles.price}>{item.price}</div>
            </div>
            <Link href={item.link} className={styles.btn}>
              BUY NOW
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
