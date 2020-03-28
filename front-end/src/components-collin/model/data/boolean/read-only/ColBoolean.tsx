import React from "react";

import "../../ColData.scss";

import "./ColBoolean.css";

export default ({
	affirmativeText = "true",
	isTrue,
	negativeText = "false",
}: {
	affirmativeText?: string,
	isTrue?: boolean,
	negativeText?: string,
}) => {
	const affirmativeClass = !!isTrue ? " col-boolean--true" : "";
	const negativeClass = !isTrue ? " col-boolean--false" : "";
	return (
		<p className={`col-boolean${affirmativeClass}${negativeClass}`}>
			{!!isTrue ?
				affirmativeText :
				negativeText}
		</p>
	);
};
