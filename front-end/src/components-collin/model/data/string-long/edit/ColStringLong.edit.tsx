import React from "react";

import "../../ColData.edit.scss";

import "./ColStringLong.edit.css";

export default ({
	autoFocus,
	autoGrow = true,
	id,
	onChange,
	value,
	placeholder,
}: {
	autoFocus?: boolean;
	autoGrow?: boolean;
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
			onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
				if (autoGrow) {
					event.currentTarget.style.height = event.currentTarget.scrollHeight + "px";
				}
				onChange(event.target.value);
			}}
			placeholder={placeholder}
			value={value}
			onFocus={(event) => {
				event.currentTarget.selectionStart = value.length;
				event.currentTarget.selectionEnd = value.length;
			}}
		/>
	);
};
