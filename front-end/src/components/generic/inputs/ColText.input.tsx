import React from "react";

import "./text.input.css";

export default ({
	autoFocus,
	onChange,
	value,
}: {
	autoFocus: boolean;
	onChange: () => void,
	value: string,
}) => {
	return (
		<input autoFocus={autoFocus} type="text" name="text"
			value={value}
			onChange={onChange}
		/>
	);
};
