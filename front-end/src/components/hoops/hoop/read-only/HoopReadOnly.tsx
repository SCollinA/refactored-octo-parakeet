import React from "react";

import { IHoop } from "../../../../models/hoop.model";

import ColPlaceholder from "../../../generic/layout/placeholder/ColPlaceholder";

import "./HoopReadOnly.css";

export default ({
	hoop,
}: {
	hoop: IHoop,
}) => {
	return (
		<>
			{!!hoop.title ?
				<p className="hoop__title">
					{hoop.title}
				</p> :
				<ColPlaceholder text="no hoop name"/>}
		</>
	);
};
