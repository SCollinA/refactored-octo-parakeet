import React from "react";

import { IHoop } from "../../../../models/hoop.model";

import ColModel from "../../../generic/model/read-only/ColModel";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";

import "./HoopReadOnly.css";

export default ({
	hoopModel,
}: {
	hoopModel: ColViewModel<IHoop>,
}) => {
	return (
		<ColModel viewModel={hoopModel}/>
	);
};
