import React from "react";

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
		<input type="number"
			id={id}
			value={value}
			onChange={(event) => onChange(+event.target.value)}
			placeholder={placeholder}
			autoFocus={autoFocus}
		/>
	);
};
