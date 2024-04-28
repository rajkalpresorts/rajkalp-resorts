"use client";

import React, { useState, useEffect } from "react";
import Tree from "@/components/tree/Tree";
import axios from "axios";
import { useSelector } from "react-redux";

function Page() {
	const [treeData, setTreeData] = useState({ name: "Loading..." });
	const user = useSelector((data) => data.user.user);
	const [rootId, setRootId] = useState(user.id);

	const gatherData = async () => {
		try {
			const res = await axios.post("/api/tree", {
				userId: rootId,
			});
			setTreeData(res.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		const gatherDataWrapper = async () => {
			await gatherData();
		};

		gatherDataWrapper();
	}, [rootId]);

	return (
		<Tree treeData={treeData} setRootId={setRootId} mainRoot={user.id} />
	);
}

export default Page;
