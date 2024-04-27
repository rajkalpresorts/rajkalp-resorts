"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import Image from "next/image";
import axios from "axios";

function payment() {
	const router = useRouter();
	const [plans, setPlans] = useState([]);
	const [processing, setProcessing] = useState(false);
	const [planId, setPlanId] = useState("");

	const getPlans = async () => {
		try {
			const res = await axios.get("/api/plan");
			setPlans(res.data.plans);
		} catch (error) {
			console.error(error);
		}
	};

	const handlePayment = async () => {
		setProcessing(true);
		try {
			const res = await axios.post("/api/payment/phonepe-integration", {
				plan: planId,
			});
			router.push(res.data.redirectUrl);
		} catch (error) {
			console.error(error);
		} finally {
			setProcessing(false);
		}
	};

	useEffect(() => {
		getPlans();
	}, []);

	return (
		<section className={styles.container}>
			<form className={styles.formBox} onSubmit={handlePayment}>
				<div className={styles.formGroup}>
					<label htmlFor="plan">Select Plan</label>
					<select
						id="plan"
						name="plan"
						className={styles.selectPlan}
						onChange={(e) => setPlanId(e.target.value)}
						required
					>
						<option value="">Select a Plan</option>
						{plans.map((item) => (
							<option key={item._id} value={item._id}>
								{item.name}
							</option>
						))}
					</select>
				</div>
				<div className={styles.paymentBox}>
					<div className={styles.heading}>
						<h2>UPI/BHIM</h2>
					</div>
					<div className={styles.logoBox}>
						<Image
							src="/assets/phonepe.png"
							alt="UPI"
							className={styles.logo}
							width={1000}
							height={1000}
						/>
					</div>
					<div className={styles.btnBox}>
						<button
							type="submit"
							className={styles.btn}
							style={processing ? { cursor: "not-allowed" } : {}}
						>
							{processing
								? "Processing..."
								: "Proceed to Payment"}
						</button>
					</div>
				</div>
			</form>
		</section>
	);
}

export default payment;
