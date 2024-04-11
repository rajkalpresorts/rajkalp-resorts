"use client";
import React, { useState } from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import loginbg from "./../../../../public/assets/rajkalp/loginbg.png";
import Footer from "@/components/footer/Footer";
import logo from "./../../../../public/assets/rajkalp/logo2.png";
import Link from "next/link";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";

const INITIAL_STATE = {
  password: "",
  confirmPassword: "",
  referalId: "",
};

function Signup2() {
  const router = useRouter();

  const searchParams = useSearchParams();
  const userID = searchParams.get("userID");

  const [formData, setFormData] = useState(INITIAL_STATE);
  const [ref, setRef] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRefYes = () => {
    setRef(true);
  };

  const handleRefNo = () => {
    setRef(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (formData.password !== formData.confirmPassword) {
        alert("Password and Confirm Password should be same");
        return;
      }

      const res = await axios.put(
        `/api/auth/register?userId=${userID}`,
        formData
      );

      if (res.status === 201) {
        const userID = res.data.user._id;
        router.push(`/auth/confirmation?userID=${userID}`);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "User id is required"
      ) {
        alert("User id is required");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Password is required"
      ) {
        alert("Password is required");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Confirm Password is required"
      ) {
        alert("Confirm Password is required");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "User does not exist"
      ) {
        alert("User does not exist");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "User already has a password"
      ) {
        alert("User already has a password");
      } else if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "Invalid referral code"
      ) {
        alert("Invalid referral code");
      } else if (error.response && error.response.status === 500) {
        alert("Internal Server Error");
      }
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
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
        <form className={styles.col1} onSubmit={handleSubmit}>
          <Image
            src={logo}
            alt="img"
            width={1500}
            height="auto"
            className={styles.logo}
          />
          <div className={styles.head1}>Secure Your Access</div>

          <input
            type="password"
            placeholder="Enter Password"
            className={styles.input5}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Confirm Password"
            className={styles.input5}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
          <div className={styles.ref}>
            Referal Id:
            <div>
              <input
                type="radio"
                id="html"
                name="fav_language"
                value="yes"
                className={styles.radio}
                onChange={handleRefYes}
                required
              />
              <label for="yes">Yes</label>
            </div>
            <div>
              <input
                type="radio"
                id="css"
                name="fav_language"
                value="no"
                className={styles.radio}
                onChange={handleRefNo}
              />
              <label for="no">No</label>
            </div>
          </div>

          {ref && (
            <input
              type="text"
              placeholder="Enter Referal Key"
              className={styles.input5}
              name="referalId"
              value={formData.referalId}
              onChange={handleChange}
              required
            />
          )}
          <button type="submit" className={styles.submitBtn2}>
            Set Password
          </button>
        </form>
        <div className={styles.col2}>
          <div className={styles.head2}>Already have an account?</div>
          <div className={styles.head3}>
            Sign In and discover a great amount of new opportunities!
          </div>
          <Link href="/auth/login" className={styles.link}>
            <button className={styles.nextBtn}>Signin</button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup2;
