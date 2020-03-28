import React, { ReactNode } from "react";

import "./ColCard.scss";

export default ({
	children,
	clickable,
}: {
	children: ReactNode,
	clickable?: boolean,
}) => {
	const clickableClass = clickable ? " clickable" : "";
	return (
		<div className={`col-card${clickableClass}`}>
			{children}
		</div>
	);
};
