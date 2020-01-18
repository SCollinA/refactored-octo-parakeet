import React from "react";

import "./ColTextArea.input.css";

export default ({
	autoFocus,
	id,
	onChange,
	value,
	placeholder,
}: {
	autoFocus?: boolean;
	id: string,
	onChange: (value: string) => void,
	value: string,
	placeholder: string,
}) => {
	return (
		<textarea id={id}
			autoFocus={autoFocus}
			className="col-input-textarea"
			name="textarea"
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
			placeholder={placeholder}
			value={value}
		/>
	);
};
