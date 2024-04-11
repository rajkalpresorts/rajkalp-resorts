"use client";
import React, { useState } from "react";
import styles from "../login/login.module.css";
import Image from "next/image";
import loginbg from "../../../../public/assets/rajkalp/loginbg.png";
import Footer from "@/components/footer/Footer";
import logo from "./../../../../public/assets/rajkalp/logo2.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import Loader from "@/components/loader/Loader";

const INITIAL_STATE = {
  firstName: "",
  lastName: "",
  email: "",
  contact: "",
  dob: "",
  gender: "",
};

function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

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
      setLoading(true)
      const res = await axios.post("/api/auth/register", formData);
      if (res.status === 201) {
        const userID = res.data.user._id;
        router.push(`/auth/signup2?userID=${userID}`);
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 400 &&
        error.response.data.error === "User already exists"
      ) {
        alert("User already exists");
      }
    }finally{
      setLoading(false)
    }
  };

  if(loading){
    return <Loader/>
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
          <div className={styles.head4}>
            Personalize Your Experience: <br />
            Let's Get to Know You
          </div>
          <div className={styles.inputRow}>
            <input
              type="text"
              placeholder="First Name"
              className={styles.inputcol1}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              placeholder="Last Name"
              className={styles.inputcol2}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <input
            type="email"
            placeholder="Email Address"
            className={styles.input2}
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Mobile Number"
            className={styles.input3}
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
          <span className={styles.phone}>+91</span>

          <div className={styles.inputRow}>
            <input
              type="date"
              placeholder="DOB (DD/MM/YYYY)"
              className={styles.inputcol1}
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
            <select
              type="text"
              placeholder="Gender"
              className={styles.inputcol2}
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="">Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <button type="submit" className={styles.submitBtn2}>
            Next
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

export default Signup;
