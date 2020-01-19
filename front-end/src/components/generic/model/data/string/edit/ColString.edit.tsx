import React from "react";

import "../../ColData.edit.css";

import "./ColString.edit.css";

export default ({
	autoFocus,
	id,
	onChange,
	value,
	placeholder,
}: {
	autoFocus: boolean;
	id: string,
	onChange: (value: string) => void,
	value: string,
	placeholder: string,
}) => {
	return (
		<input className="col-data-edit col-string-edit"
			id={id}
			autoFocus={autoFocus}
			name="text"
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
			placeholder={placeholder}
			type="text"
			value={value}
		/>
	);
};
