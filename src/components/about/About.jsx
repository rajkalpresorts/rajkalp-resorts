import React from "react";
import styles from "./about.module.css";
import Image from "next/image";
import about from "./../../../public/assets/about.png";

const About = () => {
  return (
    <div className={styles.container} id="about">
      <div className={styles.title1}>ABOUT US</div>
      <div className={styles.desc}>
        Welcome to Rajkalp Resorts & Precious Services, a dynamic group with
        over 12 years of experience in royal estate development. We specialize
        in providing a wide range of luxurious properties, including NATP plots,
        villas, cottages, resorts, holiday homes, and weekend homes, all of
        which are designed to generate a good monthly cash flow income.
        <br />
        <br />
        At Rajkalp Resorts & Precious Services, our vision is to provide every
        Indian with the opportunity to own a luxurious property and generate
        their own cash flow. We are committed to delivering the highest level of
        customer service and ensuring that each of our clients has a memorable
        and enjoyable experience when working with us.
        <br />
        <br />
        Our team of experienced professionals is dedicated to helping our
        clients find the perfect property to suit their needs and budget.
        Whether you are looking for a holiday home or a lucrative investment
        opportunity, we are here to help.
      </div>
    </div>
  );
};

export default About;
