import React, { ReactNode } from "react";

import "./ColSectionWrapper.css";

export default 	({
	children,
}: {
	children: ReactNode,
}) => (
	<div className="section-wrapper">
		{children}
	</div>
);
