import React from "react";

import "../../ColData.css";

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
