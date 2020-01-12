import React from "react";

import "./ColText.input.css";

export default ({
	autoFocus,
	onChange,
	value,
}: {
	autoFocus: boolean;
	onChange: (value: string) => void,
	value: string,
}) => {
	return (
		<input className="col-input-text" autoFocus={autoFocus} type="text" name="text"
			value={value}
			onChange={(event: React.ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
		/>
	);
};
