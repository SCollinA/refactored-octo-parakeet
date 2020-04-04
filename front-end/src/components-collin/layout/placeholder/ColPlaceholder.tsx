import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./ColPlaceholder.scss";

export default ({ text = "Oops!", icon = faEyeSlash }: {text?: string, icon?: IconDefinition}) =>
	<div className="col-placeholder">
		<FontAwesomeIcon icon={icon} size="2x"/>
		<p className="col-placeholder__text">{text}</p>
	</div>;
