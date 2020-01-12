import React from "react";

import "./ColLoading.css";

export default ({
	children,
	loading,
	text = "loading",
	fitChild = false,
	preventClick = true,
}: {
	children: any,
	loading: boolean,
	text: string,
	fitChild?: boolean,
	preventClick?: boolean,
}) => {
	const height = 29 * text.length;
	return (
		<div className={`loading-wrapper`}>
			{loading &&
				<div className={`Loading${fitChild ? " fit-child" : ""}`}
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
		</div>
	);
};
