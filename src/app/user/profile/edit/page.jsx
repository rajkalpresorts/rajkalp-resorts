"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
import axios from "axios";

function Edit() {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put("/api/auth/edit", formData);
      if (res.status === 201) {
        alert("Update Successful");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Unauthorized");
      } else if (error.response && error.response.status === 404) {
        alert("User not found");
      } else {
        alert("Internal server error");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({
      ...data,
      [name]: value,
    }));
  };

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
      <form onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <div className={styles.col1}>
            <label className={styles.lebel1}>First Name</label>
            <input
              className={styles.input1}
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div className={styles.col2}>
            <label className={styles.lebel1}>Last Name</label>
            <input
              className={styles.input1}
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row2}>
          <label className={styles.lebel1}>Email id</label>
          <input
            className={styles.input2}
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className={styles.row2}>
          <label className={styles.lebel1}>Address</label>
          <input
            className={styles.input2}
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
        </div>
        <div className={styles.row2}>
          <label className={styles.lebel1}>Contact No.</label>
          <input
            className={styles.input2}
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <div className={styles.inputRow}>
          <div className={styles.col1}>
            <label className={styles.lebel1}>City</label>
            <input
              className={styles.input1}
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className={styles.col2}>
            <label className={styles.lebel1}>State</label>
            <input
              className={styles.input1}
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.row2}>
          <label className={styles.lebel1}>Password</label>
          <input
            className={styles.input2}
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div className={styles.inputRow}>
          <div className={styles.col1}>
            <button className={styles.cancelBtn}> Cancel </button>
          </div>
          <div className={styles.col2}>
            <button type="submit" className={styles.saveBtn}>
              {" "}
              Save{" "}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Edit;
