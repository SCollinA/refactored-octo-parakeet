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
			return <button className={"col-button"} type="button" name={name} value={value}/>;
		case "reset":
			return <button className={"col-button"} type="reset" name={name} value={value}/>;
		case "submit":
			return <button className={"col-button"} type="submit" name={name} value={value}/>;
	}
};
