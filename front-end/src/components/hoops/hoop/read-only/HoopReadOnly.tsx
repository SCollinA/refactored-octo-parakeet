import React from "react";

import { IHoop } from "../../../../models/hoop.model";

import ColModel from "../../../generic/model/read-only/ColModel";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";
import { imagePrefix } from "../../../utils/functions/isStringImage";
import { scrubData } from "../../../utils/functions/scrubData";

import "./HoopReadOnly.css";

export default ({
	hoop,
}: {
	hoop: IHoop,
}) => {
	const scrubbedHoop = scrubData(hoop);
	const viewModel = new ColViewModel(scrubbedHoop, {
		...placeholders,
		id: hoop.id,
	});
	return (
		<ColModel viewModel={viewModel}/>
	);
};

const placeholders: IHoop = {
	collections: [],
	description: "",
	diameter: 0,
	file: undefined,
	id: "",
	image: imagePrefix,
	price: 0,
	recentlyupdatedimage: false,
	sold: false,
	title: "",
};
