"use client";
import React, { useEffect, useState } from "react";
import "@/app/admin/order/form.modules.scss";
import styles from "@/app/admin/utility.module.css";
import Link from "next/link";
import TableNav from "@/components/tableNav/TableNav";
import axios from "axios";
import Loader from "@/components/loader/Loader";
import Image from "next/image";

import Empty from "@/../public/assets/rajkalp/empty.png";

function Page() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);

	const assembleData = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/api/user/all");
			console.log(res.data.users);
			setData(res.data.users);
		} catch (err) {
			console.log(err);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		const assembleDataWrapper = async () => {
			try {
				await assembleData();
			} catch (err) {
				console.log(err);
			}
		};

		assembleDataWrapper();
	}, []);

	const [expandedUser, setExpandedUser] = useState(null);

	const toggleUserDetails = (userId) => {
		if (expandedUser === userId) {
			setExpandedUser(null);
		} else {
			setExpandedUser(userId);
		}
	};

	const itemsPerPage = 10;
	const totalPages = Math.ceil(data.length / itemsPerPage);
	const [currentPage, setCurrentPage] = useState(1);

	const onPageChange = (newPage) => {
		setCurrentPage(newPage);
	};

	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const displayedData = data.slice(startIndex, endIndex);

	if (loading) {
		return <Loader />;
	}

	return (
		<div className="usersList">
			<div className="box2">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email Id</th>
							<th>Contact No.</th>
							<th>Balance</th>
							<th>Total Earnings</th>
							<th>Action</th>
						</tr>
					</thead>
					{data.length != 0 && (
						<tbody>
							{displayedData.map((data, index) => (
								<React.Fragment key={index}>
									<tr
										className={
											index % 2 === 1 ? "lightgray" : ""
										}
									>
										<td>{startIndex + index + 1}</td>
										<td>
											{data?.firstName +
												" " +
												data?.lastName}
										</td>
										<td>{data?.email}</td>
										<td>{data?.contact}</td>
										<td>{data?.balance}</td>
										<td>{data?.totalEarnings}</td>
										<td className="actionColumn">
											<Link
												href=""
												legacyBehavior={false}
												onClick={(e) => {
													toggleUserDetails(
														index + 1
													);
													e.preventDefault();
												}}
											>
												{expandedUser === index + 1
													? "Close"
													: "More Details"}
											</Link>
										</td>
									</tr>
									{expandedUser === index + 1 && (
										<tr className="expandedRow">
											<td colSpan="7">
												<div className="expanded">
													<div className="col1">
														<div>
															<b>
																Created Time:{" "}
															</b>
															{new Date(
																data?.createdAt
															).toLocaleDateString(
																undefined,
																{
																	day: "numeric",
																	month: "short",
																	year: "numeric",
																}
															)}
															,{" "}
															{new Date(
																data?.createdAt
															).toLocaleTimeString()}
														</div>
														<div>
															<b>Update Time: </b>
															{new Date(
																data?.updatedAt
															).toLocaleDateString(
																undefined,
																{
																	day: "numeric",
																	month: "short",
																	year: "numeric",
																}
															)}
															,{" "}
															{new Date(
																data?.updatedAt
															).toLocaleTimeString()}
														</div>
													</div>
													<div className="col2">
														<div>
															<b>DOB: </b>{" "}
															{new Date(
																data?.dob
															).toLocaleDateString(
																undefined,
																{
																	day: "numeric",
																	month: "short",
																	year: "numeric",
																}
															)}
														</div>
														<div>
															<b>Gender: </b>
															{data?.gender}
														</div>
														<div>
															<b>Address: </b>
															{data?.city +
																", " +
																data?.state}
														</div>
														<div>
															<b>Refferal Id: </b>
															{data?.referralId}
														</div>
														{/* <div
															className={
																styles.delBtn
															}
														>
															Settle Balance
														</div> */}
													</div>
												</div>
											</td>
										</tr>
									)}
								</React.Fragment>
							))}
						</tbody>
					)}
				</table>
				{data.length == 0 && (
					<center>
						<Image
							src={Empty}
							alt="Empty"
							width={300}
							height={300}
							style={{ width: "300px", height: "auto" }}
						/>
						<div>Data will be shown here</div>
					</center>
				)}
			</div>
			{data.length != 0 && (
				<div className="tableNav">
					<TableNav
						totalPages={totalPages}
						currentPage={currentPage}
						onPageChange={onPageChange}
					/>
				</div>
			)}
		</div>
	);
}

export default Page;
