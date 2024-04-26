import React from "react";
import styles from "./page.module.css";

function payment() {
	return (
		<section className={styles.container}>
			<div className={styles.formWrapper}>
				<form>
					<div className={styles.formGroup}>
						<label htmlFor="plan">Select Plan</label>
						<select id="plan" name="plan">
							<option value="basic">Basic</option>
							<option value="premium">Premium</option>
							<option value="enterprise">Enterprise</option>
						</select>
					</div>
				</form>
			</div>
		</section>
	);
}

export default payment;
