import React from "react";

import "../../ColData.scss";

import "./ColString.css";

export default ({
	text,
}: {
	text: string,
}) => {
	return (
		<p className="col-string">
			{text}
		</p>
	);
};
