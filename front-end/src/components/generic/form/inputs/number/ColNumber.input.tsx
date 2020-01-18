import React from "react";

import "../../ColInput.css";

import "./ColNumber.input.css";

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
		<input className="col-input col-input-number"
			type="number"
			id={id}
			value={value}
			onChange={(event) => onChange(+event.target.value)}
			placeholder={placeholder}
			autoFocus={autoFocus}
		/>
	);
};
