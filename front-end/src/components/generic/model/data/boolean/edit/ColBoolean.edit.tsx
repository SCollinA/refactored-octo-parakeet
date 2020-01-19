import React from "react";

import "../../ColData.edit.css";

import "./ColBoolean.edit.css";

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
			<input className="col-data-edit col-boolean-edit"
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
