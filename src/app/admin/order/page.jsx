"use client";
import React, { useEffect, useState } from "react";
import "@/app/admin/order/form.modules.scss";
import styles from "@/app/admin/utility.module.css";
import Link from "next/link";
import TableNav from "@/components/tableNav/TableNav";
import axios from "axios";
import Loader from "@/components/loader/Loader";
import Image from "next/image";
import ReactModal from "react-modal";

import Empty from "@/../public/assets/rajkalp/empty.png";

function Page() {
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(true);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const assembleData = async () => {
		setLoading(true);
		try {
			const res = await axios.get("/api/order");
			setData(res.data.orders);
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
							<th>Plan</th>
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
											{data.user?.firstName +
												" " +
												data.user?.lastName}
										</td>
										<td>{data.user?.email}</td>
										<td>{data.user?.contact}</td>
										<td>
											{data.plan?.name +
												" " +
												"(" +
												data.plan?.amount +
												" Rs.)"}
										</td>
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
													<ReactModal
														isOpen={
															isDeleteModalOpen
														}
														onRequestClose={() => {
															setIsDeleteModalOpen(
																false
															);
														}}
														style={{
															content: {
																top: "50%",
																left: "50%",
																right: "auto",
																bottom: "auto",
																marginRight:
																	"-50%",
																transform:
																	"translate(-50%, -50%)",
																width: "400px",
																height: "120px",
																display: "flex",
																justifyContent:
																	"center",
																alignItems:
																	"center",
															},
														}}
													>
														<div
															className={
																styles.modalWrapper
															}
														>
															<div
																className={
																	styles.modalText
																}
															>
																Are you sure you
																want to Delete ?
															</div>
															<div
																className={
																	styles.modalButton
																}
															>
																<div
																	className={
																		styles.confirmDelBtn
																	}
																	onClick={() => {
																		handleDelete(
																			data._id
																		);
																		setIsDeleteModalOpen(
																			false
																		);
																	}}
																>
																	Delete
																</div>
																<div
																	className={
																		styles.cancelBtn
																	}
																	onClick={() => {
																		setIsDeleteModalOpen(
																			false
																		);
																	}}
																>
																	Cancel
																</div>
															</div>
														</div>
													</ReactModal>
													<div className="col1">
														<div>
															<b>Order Time: </b>
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
															<b>
																Payment Status:{" "}
															</b>{" "}
															{
																data?.paymentStatus
															}
														</div>
														<div>
															<b>
																Payment Time:{" "}
															</b>{" "}
															{new Date(
																data?.paymentTime
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
																data?.paymentTime
															).toLocaleTimeString()}
														</div>
														<div>
															<b>Amount: </b>
															{data?.phonepeAmount /
																100 +
																" Rs."}
														</div>
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
