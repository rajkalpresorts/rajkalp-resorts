import React from "react";
import { useRouter, usePathname } from "next/navigation";
import styles from "./Sidebar.module.css";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/userSlice";

const sidebar = [
	{
		name: "Orders",
		link: "/admin/order",
		highlight: ["order"],
	},
	{
		name: "Users",
		link: "/admin/user",
		highlight: ["user"],
	},
	{
		name: "Tree",
		link: "/admin/tree",
		highlight: ["tree"],
	},
];

const Sidebar = () => {
	const pathname = usePathname();
	const path = pathname.split("/").pop();

	const router = useRouter();
	const dispatch = useDispatch();

	const handleLogout = async () => {
		try {
			await axios.get("/api/auth/logout");
			dispatch(logout());
			router.push("/");
			alert("You were logged out!");
		} catch (err) {
			console.log("Some error occured!");
			alert("Unable to logout, try after a minute.");
		}
	};

	return (
		<div className={styles.sidebar}>
			<nav className={styles.menu}>
				<ul>
					{sidebar.map((item, idx) => (
						<li
							key={idx}
							className={
								item.highlight.includes(path)
									? styles.activeMenuItem +
									  " " +
									  styles.menuItem
									: styles.menuItem
							}
						>
							<Link href={item.link} legacyBehavior>
								<div className={styles.menuItemDiv}>
									{item.name}
								</div>
							</Link>
						</li>
					))}
				</ul>
			</nav>
			<button className={styles.signOutBtn} onClick={handleLogout}>
				Sign Out
			</button>
		</div>
	);
};

export default Sidebar;
