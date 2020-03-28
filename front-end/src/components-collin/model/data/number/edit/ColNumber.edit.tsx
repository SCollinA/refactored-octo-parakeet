import React from "react";

import "../../ColData.edit.scss";

import "./ColNumber.edit.css";

export default ({
	autoFocus,
	id,
	onChange,
	value,
	placeholder,
}: {
	autoFocus: boolean;
	id: string,
	onChange: (value: number) => void,
	value: number,
	placeholder: string,
}) => {
	return (
		<input className="col-data-edit col-number-edit"
			type="number"
			id={id}
			value={value}
			onChange={(event) => onChange(+event.target.value)}
			placeholder={placeholder}
			autoFocus={autoFocus}
		/>
	);
};
