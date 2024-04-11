"use client";
import React, { useEffect, useState } from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import loginbg from "../../../../public/assets/rajkalp/loginbg.png";
import Footer from "@/components/footer/Footer";
import logo from "./../../../../public/assets/rajkalp/logo2.png";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { set } from "mongoose";
import axios from "axios";

function Confirmation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userID = searchParams.get("userID");

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  const handleClick = () => {
    alert("Account Created Successfully");
    router.push("/auth/login");
  };

  useEffect(() => {
    if (!userID) {
      router.push("/auth/login");
    }

    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/auth/register?userId=${userID}`);
        if (res.status === 200) {
          setFormData(res?.data?.user);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          router.push("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userID]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Image
        src={loginbg}
        alt="img"
        width={2000}
        height="auto"
        className={styles.loginbg}
      />
      <div className={styles.container}>
        <div className={styles.col1c}>
          <Image
            src={logo}
            alt="img"
            width={1500}
            height="auto"
            className={styles.logo}
          />
          <div className={styles.head1}>Confirmation Page</div>

          <div className={styles.inputRow}>
            <div className={styles.inputcol1}>{formData?.firstName}</div>
            <div className={styles.inputcol2}>{formData?.lastName}</div>
          </div>
          <div className={styles.input2}>{formData?.email}</div>

          <div className={styles.input2}>{formData?.contact}</div>

          <div className={styles.inputRow}>
            <div className={styles.inputcol1}>
              {new Date(formData?.dob).getDate()}/
              {new Date(formData?.dob).getMonth()}/
              {new Date(formData?.dob).getFullYear()}
            </div>
            <div className={styles.inputcol2}>{formData?.gender}</div>
          </div>

          <div className={styles.ref}>Referal Id: {formData?.ref}</div>
          <button onClick={handleClick} className={styles.submitBtn2}>
            Create Account
          </button>
        </div>
        <div className={styles.col2}>
          <div className={styles.head2}>Already have an account?</div>
          <div className={styles.head3}>
            Sign In and discover a great amount of new opportunities!
          </div>
          <Link href="/signup2" className={styles.link}>
            <button className={styles.nextBtn}>Signin</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Confirmation;
