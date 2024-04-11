"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import refbg from "@/../public/assets/rajkalp/refbg.png";
import { useRouter } from "next/navigation";
import axios from "axios";

function Referral() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const verifyToken = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/auth/verify-token`);
        if (res.status === 200) {
          setUser(res?.data?.user?.id);
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          // router.push("/auth/login");
        }
      } finally {
        setLoading(false);
      }
    };
    verifyToken();
  }, []);

  const handleSubmit = () => {};
  const handleChange = () => {};

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`/api/auth/register?userId=${user}`);
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
    if (user && user.length > 0) {
      fetchUser();
    }
  }, [user]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.col1}>
        <h1 className={styles.head1}>
          Invite your friends to join <br />
          Rajkalp Resorts and <br />
          earn exciting incentives!
        </h1>
        <h4 className={styles.head2}>
          {" "}
          Share your unique referral ID with others <br />
          and unlock exclusive rewards.
        </h4>
        <div className={styles.refBox}>{formData.referralId}</div>
      </div>
      <div className={styles.col2}>
        <Image
          src={refbg}
          width={1000}
          height="auto"
          className={styles.refbg}
        />
      </div>
    </div>
  );
}

export default Referral;
