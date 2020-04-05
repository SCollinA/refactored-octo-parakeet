import React, { ReactNode, useState, useEffect } from "react";

import "./ColLoading.scss";

let loadingTimer: any;

export default ({
	children,
	loading,
	loadingTimeout = 500,
	text = "loading...",
	fitChild = false,
	preventClick = false,
}: {
	children: ReactNode,
	loading: boolean,
	loadingTimeout?: number,
	text?: string,
	fitChild?: boolean,
	preventClick?: boolean,
}) => {
	const height = 33 * text.length;
	const [innerLoading, setInnerLoading] = useState<boolean>(loading);
	// console.log("initiializing loaidng", loading, innerLoading);
	useEffect(() => {
		// console.log("loading effect", loading);
		// Always start loading
		if (loading) {
			// console.log("loading effect true", loading);
			setInnerLoading(true);
			clearTimeout(loadingTimer);
			// Start timer
			loadingTimer = setTimeout(() => {
				// console.log("loading effect timer", loading);
				// setInnerLoading(false);
				clearTimeout(loadingTimer);
			}, loadingTimeout);
		// If stopping loading and timer not expired
		} else if (!!loadingTimer) {
			clearTimeout(loadingTimer);
			loadingTimer = setTimeout(() => {
				// console.log("loading effect timer", loading);
				setInnerLoading(false);
				clearTimeout(loadingTimer);
			}, loadingTimeout);
		} else {
			// console.log("loading effect false no timer", loading);
			setInnerLoading(false);
		}
	}, [loading]);
	return (
		<>
			{innerLoading &&
				<div className={`col-loading${fitChild ? " fit-child" : ""}`}
					onClick={(event) =>
						preventClick && event.stopPropagation()}
				>
					<svg viewBox={`0 0 ${height} ${height}`}>
						<path id="curve" fill="transparent"
							d={`
								M ${height / 2} ${height / 2}
								m -${height / 4} 0
								a ${height / 4} ${height / 4} 0 1 1 ${height / 2} 0
								a ${height / 4} ${height / 4} 0 1 1 -${height / 2} 0
							`}
						/>
						<text width={height}>
							<textPath alignmentBaseline="auto"
								xlinkHref="#curve"
							>
								{text}
							</textPath>
						</text>
					</svg>
				</div>}
			{children}
		</>
	);
};
