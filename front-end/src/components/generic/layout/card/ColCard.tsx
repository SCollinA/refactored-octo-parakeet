import React, { ReactNode } from "react";

import "./ColCard.css";

export default ({
	children,
	clickable,
}: {
	children: ReactNode,
	clickable?: boolean,
}) => {
	const clickableClass = clickable ? " col-card--clickable" : "";
	return (
		<div className={`col-card${clickableClass}`}>
			{children}
		</div>
	);
};
