import React from "react";

import "../../ColData.edit.scss";

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
	const checkedClass = ` col-boolean-edit${checked ? "--true" : "--false"}`;
	return (
		<div className={`col-data-edit col-boolean-edit${checkedClass}`}>
			<p className="col-boolean-edit__true-text">
				{affirmativeText}
			</p>
			<div className="col-boolean-edit__switch">
				<div className="col-boolean-edit__switch-current"></div>
			</div>
			<p className="col-boolean-edit__false-text">
				{negativeText}
			</p>
			<input className="col-data-edit col-boolean-edit__input"
				type="checkbox"
				id={id}
				name="checkbox"
				value={value}
				autoFocus={autoFocus}
				checked={checked}
				onChange={(event) => onChange(event.target.checked)}
			/>
		</div>
	);
};
