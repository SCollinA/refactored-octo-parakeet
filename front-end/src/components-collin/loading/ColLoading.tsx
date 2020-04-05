import React, { ReactNode, useState, useEffect } from "react";
import { debounce } from "lodash/fp";

import "./ColLoading.scss";

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
	const debouncedLoading = debounce(loadingTimeout,
		() => setInnerLoading(loading),
	);
	useEffect(() => loading ?
		setInnerLoading(loading) :
		debouncedLoading(),
	[loading]);
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
