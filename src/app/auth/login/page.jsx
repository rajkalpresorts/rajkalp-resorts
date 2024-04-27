"use client";
import React, { useState } from "react";
import styles from "./login.module.css";
import Image from "next/image";
import loginbg from "./../../../../public/assets/rajkalp/loginbg.png";
import Footer from "@/components/footer/Footer";
import logo from "./../../../../public/assets/rajkalp/logo2.png";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { useDispatch } from "react-redux";
import { login } from "@/redux/slices/userSlice";

const INITIAL_STATE = {
	email: "",
	password: "",
};

function Login() {
	const router = useRouter();
	const dispatch = useDispatch();
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
			setLoading(true);
			const res = await axios.post("/api/auth/login", formData);
			dispatch(login(res.data.user));
			if (res.status === 200 && res.data.user.role === "admin") {
				router.push("/admin");
			} else if (res.status === 200 && res.data.user.role === "user") {
				router.push("/user");
			}
		} catch (error) {
			if (
				error.response &&
				error.response.status === 400 &&
				error.response.data.error === "No user found"
			) {
				alert("No user found");
			} else if (
				error.response &&
				error.response.status === 400 &&
				error.response.data.error === "Invalid credentials"
			) {
				alert("Invalid credentials");
			} else {
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
					<div className={styles.head1}>Login to Your Account</div>
					<input
						type="text"
						placeholder="Email Address"
						className={styles.input}
						name="email"
						value={formData.email}
						onChange={handleChange}
					/>
					<input
						type="password"
						placeholder="Password"
						className={styles.input}
						name="password"
						value={formData.password}
						onChange={handleChange}
					/>
					<button type="submit" className={styles.submitBtn}>
						Signin
					</button>
				</form>
				<div className={styles.col2}>
					<div className={styles.head2}>Don't have an account?</div>
					<div className={styles.head3}>
						Signup and discover a great amount of new opportunities!
					</div>
					<Link href="/auth/signup" className={styles.link}>
						<button className={styles.signup}>Signup</button>
					</Link>
				</div>
			</div>
			<Footer />
		</>
	);
}

export default Login;
