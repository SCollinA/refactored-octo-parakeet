import React from "react";

import "./ColText.input.css";

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
		<input id={id}
			autoFocus={autoFocus}
			className="col-input-text"
			name="text"
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
			placeholder={placeholder}
			type="text"
			value={value}
		/>
	);
};
