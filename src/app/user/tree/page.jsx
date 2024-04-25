"use client";

import React from "react";
import styles from "./page.module.css";
import Tree from "react-d3-tree";

const myTreeData = [
	{
		name: "CEO",
		children: [
			{
				name: "Manager",
				attributes: {
					department: "Production",
				},
				children: [
					{
						name: "Foreman",
						attributes: {
							department: "Fabrication",
						},
						children: [
							{
								name: "Workers",
							},
						],
					},
					{
						name: "Foreman",
						attributes: {
							department: "Assembly",
						},
						children: [
							{
								name: "Workers",
							},
						],
					},
				],
			},
			{
				name: "Manager",
				attributes: {
					department: "Marketing",
				},
				children: [
					{
						name: "Sales Officer",
						attributes: {
							department: "A",
						},
						children: [
							{
								name: "Salespeople",
							},
						],
					},
					{
						name: "Sales Officer",
						attributes: {
							department: "B",
						},
						children: [
							{
								name: "Salespeople",
							},
						],
					},
				],
			},
		],
	},
];

const renderForeignObjectNode = ({
	nodeDatum,
	toggleNode,
	foreignObjectProps,
}) => (
	<g>
		<foreignObject {...foreignObjectProps}>
			<div className={styles.foreignObjectStyle} onClick={toggleNode}>
				<div>{nodeDatum.name}</div>
				{nodeDatum.attributes?.department && (
					<div>Department: {nodeDatum.attributes?.department}</div>
				)}
			</div>
		</foreignObject>
	</g>
);

function Page() {
	const foreignObjectProps = { width: 150, height: 100, x: -75, y: -50 };
	return (
		<div className={styles.container}>
			<h1>ORG Chart POC</h1>
			<div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
				<Tree
					data={myTreeData}
					pathFunc="step"
					separation={{ siblings: 2, nonSiblings: 2 }}
					orientation="vertical"
					translate={{ x: 900, y: 100 }}
					allowForeignObjects={true}
					renderCustomNodeElement={(rd3tProps) =>
						renderForeignObjectNode({
							...rd3tProps,
							foreignObjectProps,
						})
					}
					zoomable={true}
					draggable={true}
					initialDepth={1}
				/>
			</div>
		</div>
	);
}

export default Page;
