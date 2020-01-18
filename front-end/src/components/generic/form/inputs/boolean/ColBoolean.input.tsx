import React from "react";

import "../../ColInput.css";

import "./ColBoolean.input.css";

export default ({
	affirmativeText = "true",
	autoFocus,
	checked,
	id,
	negativeText = `not ${affirmativeText}`,
	onChange,
}: {
	affirmativeText?: string,
	autoFocus?: boolean;
	checked: boolean,
	id: string,
	negativeText?: string,
	onChange: (value: boolean) => void,
}) => {
	const value = checked ? affirmativeText : negativeText;
	return (
		<>
			<input className="col-input col-input-boolean"
				type="checkbox"
				id={id}
				name="checkbox"
				value={value}
				autoFocus={autoFocus}
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
			/>
			<p>{value}</p>
		</>
	);
};
