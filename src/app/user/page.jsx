"use client";
import React from "react";
import styles from "./page.module.css";
import { useSelector } from "react-redux";

const Dashboard = () => {
	const user = useSelector((data) => data.user.user);

	return (
		<div className={styles.welcomeDiv}>
			<h1>Welcome Aboard!</h1>
			<br />
			<br />
			<h3 className={styles.welcomePara}>
				Dear {user.firstName}, <br />
				<br />
				Welcome to Rajkalp Resorts!
				<br /> <br />
				Congratulations on joining our exclusive community! As a member,
				you'll enjoy luxurious perks like a 5-day stay at Rajkalp
				Resorts in Tadoba and 12 lifetime weekend getaways.
				<br />
				<br />
				Plus, with our Incentive Plan, you can earn rewards just by
				introducing others to our platform. It's the perfect way to turn
				your dreams of luxury living into reality.
				<br />
				<br />
				Let's embark on this exciting journey together!
				<br />
				<br />
				Best Regards,
				<br />
				Rajkalp Resorts & Precious Services
				<br />
				<br />
			</h3>
		</div>
	);
};

export default Dashboard;
