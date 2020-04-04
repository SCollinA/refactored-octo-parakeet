import React, { ReactNode, useState, useEffect } from "react";

import sleepUtils from "../utils/sleep.utils";

import "./ColLoading.scss";

export default ({
	children,
	loading,
	loadingTimeout = 1000,
	text = "loading",
	fitChild = false,
	preventClick = true,
}: {
	children: ReactNode,
	loading?: boolean,
	loadingTimeout?: number,
	text?: string,
	fitChild?: boolean,
	preventClick?: boolean,
}) => {
	const height = 29 * text.length;
	const [innerLoading, setInnerLoading] = useState<boolean>(loading || false);
	useEffect(() => {
		sleepUtils(loadingTimeout).then(() =>
			setInnerLoading(loading || false)
		);
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
