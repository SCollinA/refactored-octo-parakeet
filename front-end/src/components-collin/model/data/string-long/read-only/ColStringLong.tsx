import React from "react";

import "../../ColData.scss";

import "./ColStringLong.css";

export default ({
	text,
}: {
	text: string,
}) => {
	return (
		<p className="col-string-long">
			{text}
		</p>
	);
};
