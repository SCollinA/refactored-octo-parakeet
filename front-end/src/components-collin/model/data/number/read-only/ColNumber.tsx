import React from "react";

import "../../ColData.scss";

import "./ColNumber.css";

export default ({
	value,
}: {
	value: number,
}) => {
	return (
		<p className="col-number">
			{value}
		</p>
	);
};
