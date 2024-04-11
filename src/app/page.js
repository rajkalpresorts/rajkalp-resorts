"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import hero from "./../../public/assets/hero.png";
import hero2 from "./../../public/assets/hero2.png";
import hero3 from "./../../public/assets/hero3.png";
import mhero from "./../../public/assets/mhero.png";
import mhero2 from "./../../public/assets/mhero2.png";
import mhero3 from "./../../public/assets/mhero3.png";
import Form from "@/components/form/Form";
import About from "@/components/about/About";
import Products from "@/components/products/Products";
import Packages from "@/components/packages/Packages";
import Tadoba from "@/components/tadoba/Tadoba";
import Testimonials from "@/components/testimonials/Testimonials";
import ShopBtn from "@/components/shopBtn/ShopBtn";
import SecurityForm from "@/components/securityForm/SecurityForm";
import Shop from "@/components/shop/Shop";
import Experience from "@/components/experience/Experience";
import Safari from "@/components/safari/Safari";
import Link from "next/link";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
import { Pagination } from "swiper/modules";
import { Autoplay } from "swiper/modules";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.heroSection}>
          <Swiper
            // navigation={true}
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={2000}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              {" "}
              <Image src={hero} className={styles.heroImg} placeholder="blur" />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                src={hero3}
                className={styles.heroImg}
                placeholder="blur"
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                src={hero2}
                className={styles.heroImg}
                placeholder="blur"
              />
            </SwiperSlide>
          </Swiper>
          <div className={styles.heroInfo}>
            <div className={styles.heroTitle}>
              RAJKALP RESORTS & <br />
              PRECIOUS SERVICES
            </div>
            <div className={styles.heroDesc}>
              Elevate your lifestyle with Rajkalp Resorts & Precious Services -
              where <br /> dreams meet investments, and every stay is a royal
              experience
            </div>
            <Link href="/#footer">
              <div className={styles.heroBtn}>EXPLORE</div>
            </Link>
          </div>
        </div>

        <div className={styles.heroSectionm}>
          <Swiper
            // navigation={true}
            pagination={{
              dynamicBullets: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={2000}
            loop={true}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            <SwiperSlide>
              {" "}
              <Image
                src={mhero}
                className={styles.heroImg2}
                placeholder="blur"
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                src={mhero2}
                className={styles.heroImg2}
                placeholder="blur"
              />
            </SwiperSlide>
            <SwiperSlide>
              {" "}
              <Image
                src={mhero3}
                className={styles.heroImg2}
                placeholder="blur"
              />
            </SwiperSlide>
          </Swiper>

          <div className={styles.heroInfo}>
            <div className={styles.heroTitle}>
              RAJKALP RESORTS & <br />
              PRECIOUS SERVICES
            </div>
            <div className={styles.heroDesc}>
              Elevate your lifestyle with Rajkalp Resorts & Precious Services -
              where <br /> dreams meet investments, and every stay is a royal
              experience
            </div>
            <Link href="/#footer">
              <div className={styles.heroBtn}>EXPLORE</div>
            </Link>
          </div>
        </div>

        <About />
        <Products />
        {/* <ShopBtn /> */}
        <Packages />
        <Tadoba />
        <Experience />
        <Safari />

        <Testimonials />
        {/* <SecurityForm /> */}
        <br />
        <br />
        {/* <Shop /> */}
      </div>
      <Footer />
    </>
  );
}
