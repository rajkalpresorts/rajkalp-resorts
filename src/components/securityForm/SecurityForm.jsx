"use client";
import React, { useState } from "react";
import styles from "./securityForm.module.css";
import axios from "axios";

const SecurityForm = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    address: "",
    pincode: "",
    securityType: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axios({
      method: "post",
      url: "/api/data/form",
      params: {},
      data: formData,
    })
      .then(function (response) {
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          address: "",
          pincode: "",
          securityType: "",
          message: "",
        });
        alert("Your message/query has been submitted successfully.");
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        setLoading(false);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.head}>ENQUIRE NOW</div>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.row}>
          <div className={styles.param}>
            <label className={styles.label} htmlFor="name">
              Name:
            </label>
            <input
              className={styles.input}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.param}>
            <label className={styles.label} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.param}>
            <label className={styles.label} htmlFor="phoneNumber">
              Phone:
            </label>
            <input
              className={styles.input}
              type="number"
              name="phoneNumber"
              id="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.param}>
            <label className={styles.label} htmlFor="address">
              Address:
            </label>
            <input
              className={styles.input}
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.param}>
            <label className={styles.label} htmlFor="pincode">
              Pincode:
            </label>
            <input
              className={styles.input}
              type="number"
              name="pincode"
              id="pincode"
              value={formData.pincode}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.param}>
            <label className={styles.label} htmlFor="securityType">
              Type of Security:
            </label>
            <input
              className={styles.input}
              type="text"
              name="securityType"
              id="securityType"
              value={formData.securityType}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.param2}>
          <label className={styles.label} htmlFor="message">
            Message {"(if any):"}
          </label>
          <textarea
            className={styles.message}
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button
          className={`${styles.btn} ${loading ? styles.btnDisabled : ""}`}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default SecurityForm;
