import React from "react";

import "../../ColData.edit.css";

import "./ColStringLong.edit.css";

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
		<textarea className="col-data-edit col-string-long-edit"
			id={id}
			autoFocus={autoFocus}
			name="textarea"
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => onChange(event.target.value)}
			placeholder={placeholder}
			value={value}
		/>
	);
};
