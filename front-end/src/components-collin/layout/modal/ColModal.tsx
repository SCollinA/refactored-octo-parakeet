import React, { ReactNode } from "react";

import ColCard from "../card/ColCard";

import "./ColModal.scss";

export default ({
	children,
}: {
	children: ReactNode,
}) =>
	<div className="col-modal">
		<ColCard>
			{children}
		</ColCard>
	</div>