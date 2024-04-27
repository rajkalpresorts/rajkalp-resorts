import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

function failure() {
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
				<p className={styles.amount}>500 Rs.</p>
				<div className={styles.detailsBox}>
					<h2>Payment Details</h2>
					<div className={styles.detail}>
						<p>Name:</p>
						<p>123456789</p>
					</div>
					<div className={styles.detail}>
						<p>Payment Date:</p>
						<p>12/12/2021</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default failure;
