"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "@/components/loader/Loader";
import Sidebar from "@/components/sidebar/Sidebar";
import Image from "next/image";
import styles from "./layout.module.css";

const layout = ({ children }) => {
	const router = useRouter();
	const [loading, setLoading] = useState(true);

	const user = useSelector((data) => data.user.user);

	useEffect(() => {
		if (!user) {
			router.push("/auth/login");
		} else if (user.role !== "admin") {
			router.push("/auth/login");
		}
		if (user) {
			setLoading(false);
		}
	}, [user]);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<Image
					src="/assets/footlogo.png"
					alt="logo"
					width={300}
					height={300}
					style={{ width: "120px", height: "auto" }}
				/>
				<h1>Admin</h1>
			</div>
			<div className={styles.dashboard}>
				<div className={styles.leftPanel}>
					<Sidebar />
				</div>
				<div className={styles.rightPanel}>{children}</div>
			</div>
		</div>
	);
};

export default layout;
