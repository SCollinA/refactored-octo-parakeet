import React from "react";

import "./ColButton.css";

export default ({
	action,
	name,
	type,
	value,
}: {
	action: () => void,
	name: string,
	type: "button" | "reset" | "submit",
	value: string,
}) => {
	switch (type) {
		case "button":
			return <button className={"col-button"}
				type="button"
				name={name}
				onClick={() => action()}
			>
				{value}
			</button>;
		case "reset":
			return <button className={"col-button-reset"}
				type="reset"
				name={name}
				onClick={() => action()}
			>
				{value}
			</button>;
		case "submit":
			return <button className={"col-button-submit"}
				type="submit"
				name={name}
				onClick={() => action()}
			>
				{value}
			</button>;
	}
};
