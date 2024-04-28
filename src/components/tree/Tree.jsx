import React from "react";
import styles from "./page.module.css";
import Tree from "react-d3-tree";
import Image from "next/image";

const renderForeignObjectNode = ({
	nodeDatum,
	toggleNode,
	foreignObjectProps,
	setRootId,
}) => (
	<g>
		<foreignObject {...foreignObjectProps}>
			<div
				className={styles.foreignObjectStyle}
				onClick={() => setRootId(nodeDatum.attributes?.id)}
			>
				<div>
					<Image
						src="/assets/rajkalp/user.png"
						style={{
							width: "20px",
							height: "20px",
						}}
						alt={nodeDatum.name}
						width={500}
						height={500}
					/>
				</div>
				<div
					style={{
						fontWeight: "bold",
					}}
				>
					{nodeDatum.name}
				</div>
				{nodeDatum.attributes?.email && (
					<div
						style={{
							fontSize: "0.75em",
						}}
					>
						<span
							style={{
								fontWeight: "bold",
							}}
						>
							Email:
						</span>{" "}
						{nodeDatum.attributes?.email}
					</div>
				)}
			</div>
		</foreignObject>
	</g>
);

function Page({ treeData, setRootId, mainRoot }) {
	const foreignObjectProps = { width: 200, height: 80, x: -100, y: -50 };

	return (
		<div className={styles.container}>
			<h1>Referrals Tree</h1>
			<p
				className={styles.reload}
				onClick={() => {
					setRootId(mainRoot);
				}}
			>
				Reload Tree
			</p>
			<div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
				<Tree
					data={treeData}
					pathFunc="step"
					separation={{ siblings: 2, nonSiblings: 2 }}
					orientation="vertical"
					translate={{ x: 900, y: 100 }}
					allowForeignObjects={true}
					renderCustomNodeElement={(rd3tProps) =>
						renderForeignObjectNode({
							...rd3tProps,
							foreignObjectProps,
							setRootId,
						})
					}
					zoomable={true}
					draggable={true}
					initialDepth={3}
				/>
			</div>
		</div>
	);
}

export default Page;
