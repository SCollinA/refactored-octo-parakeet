import React, { ReactNode } from "react";

import "./ColCard.css";

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	return (
		<div className="col-card">
			{children}
		</div>
	);
};
