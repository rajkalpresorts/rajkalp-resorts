"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import axios from "axios";

function failure() {
	const searchParams = useSearchParams();
	const transactionId = searchParams.get("transactionId");

	const [paymentDetails, setPaymentDetails] = useState({});

	const getPaymentDetails = async () => {
		try {
			if (!transactionId) return;
			const res = await axios.post("/api/payment/info", {
				transactionId,
			});
			setPaymentDetails(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getPaymentDetails();
	}, [transactionId]);

	return (
		<section className={styles.container}>
			<div className={styles.statusBox}>
				<div className={styles.heading}>
					<h1>Payment Successful!</h1>
					<p>Your payment was successful. Thank you!.</p>
				</div>
				<div className={styles.image}>
					<Image
						src="/assets/success.png"
						alt="success"
						width={500}
						height={500}
					/>
				</div>
				<p className={styles.amount}>
					{paymentDetails.plan?.amount} Rs.
				</p>
				<div className={styles.detailsBox}>
					<h2>Payment Details</h2>
					<div className={styles.detail}>
						<p>Name:</p>
						<p>
							{paymentDetails.user?.firstName +
								" " +
								paymentDetails.user?.lastName}
						</p>
					</div>
					<div className={styles.detail}>
						<p>Phone No:</p>
						<p>{paymentDetails.user?.contact}</p>
					</div>
					<div className={styles.detail}>
						<p>#Transaction Id:</p>
						<p>{paymentDetails.transactionId}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default failure;
