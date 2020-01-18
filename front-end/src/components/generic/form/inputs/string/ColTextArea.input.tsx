import React from "react";

import "../../ColInput.css";

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
		<textarea className="col-input col-input-textarea"
			id={id}
			autoFocus={autoFocus}
			name="textarea"
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
			placeholder={placeholder}
			value={value}
		/>
	);
};
