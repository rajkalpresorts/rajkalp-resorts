import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

function failure() {
	return (
		<section className={styles.container}>
			<div className={styles.statusBox}>
				<div className={styles.heading}>
					<h1>Payment Failed!</h1>
					<p>Something went wrong while processing your payment.</p>
				</div>
				<div className={styles.image}>
					<Image
						src="/assets/failure.png"
						alt="failure"
						width={500}
						height={500}
					/>
				</div>
				<div className={styles.tryAgainBox}>
					<p>
						Please try again or contact our support team for further
						assistance.
					</p>
					<Link href="/user/profile/payment">
						<div className={styles.btn}>Try Again</div>
					</Link>
				</div>
			</div>
		</section>
	);
}

export default failure;
