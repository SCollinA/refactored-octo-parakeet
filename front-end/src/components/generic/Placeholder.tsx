import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

export default ({ text = "Oops!", icon = faEyeSlash }: {text?: string, icon?: IconDefinition}) =>
	<div className="Placeholder">
		<FontAwesomeIcon icon={icon} size="2x"/>
		<p className="placeholderText">{text}</p>
	</div>;

