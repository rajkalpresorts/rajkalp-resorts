import React from "react";
import styles from "./page.module.css";
import { data } from "@/data/data";
import Image from "next/image";
import solHero from "./../../../../public/assets/solHero.jpg";
import SecurityForm from "@/components/securityForm/SecurityForm";
import Shop from "@/components/shop/Shop";

const Service = ({ params }) => {
  const currData = data.find((item) => item.id == params.slug);
  if (!currData) {
    throw new Error("Page not found");
  }

  return (
    <>
      <div className={styles.heroSection}>
        <Image
          src={solHero}
          className={styles.heroImg}
          fill
          placeholder="blur"
          alt="Image"
        />
        <div className={styles.overlay}>
          <div className={styles.heroTitle}>{currData.title}</div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.first}>
          <div className={styles.desc}>{currData.desc1}</div>
          {currData.desc2 && (
            <div className={styles.desc}>{currData.desc2}</div>
          )}
        </div>
        <div className={styles.second}>
          <div className={styles.type}>
            <div className={styles.title}>Challenges</div>
            <div className={styles.list}>
              {currData.challenges.map((item, index) => (
                <div className={styles.item} key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className={styles.type}>
            <div className={styles.title}>Solution</div>
            <div className={styles.list}>
              {currData.solutions.map((item, index) => (
                <div className={styles.item} key={index}>
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Image
          src={currData.img}
          className={styles.img}
          width={2000}
          style={{ height: "auto" }}
          placeholder="blur"
          alt="Overview"
        />
        <SecurityForm />
      </div>
      <Shop />
    </>
  );
};

export default Service;
