import React from "react";

import "./ColButton.css";

export default ({
	action = () => undefined,
	type,
	value,
}: {
	action?: () => void,
	type: "button" | "reset" | "submit",
	value: string,
}) => {
	switch (type) {
		case "button":
			return <button className={"col-button"}
				type="button"
				onClick={(event) => {
					event.stopPropagation();
					action();
				}}
			>
				{value}
			</button>;
		case "reset":
			return <button className={"col-button-reset"}
				type="reset"
			>
				{value}
			</button>;
		case "submit":
			return <button className={"col-button-submit"}
				type="submit"
			>
				{value}
			</button>;
	}
};
