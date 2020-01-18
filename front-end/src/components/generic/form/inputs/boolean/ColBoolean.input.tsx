import React from "react";

import "./ColBoolean.input.css";

export default ({
	affirmativeText = "true",
	autoFocus,
	checked,
	negativeText = `not ${affirmativeText}`,
	onChange,
}: {
	affirmativeText?: string,
	autoFocus?: boolean;
	checked: boolean,
	negativeText?: string,
	onChange: (value: boolean) => void,
}) => {
	return (
		<div className="col-boolean-input">
			<label htmlFor="true">
				{affirmativeText}
			</label>
			<input type="radio"
				autoFocus={autoFocus}
				id="true"
				name="radio"
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
			/>
			<label htmlFor="true">
				{negativeText}
			</label>
			<input type="radio"
				id="false"
				name="radio"
				checked={!checked}
				onChange={(event) => onChange(!event.target.checked)}
			/>
		</div>
	);
};
