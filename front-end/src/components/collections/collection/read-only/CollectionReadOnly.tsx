import React from "react";

import { ICollection } from "../../../../models/collection.model";

import ColModel from "../../../generic/model/read-only/ColModel";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";

export default ({
	collectionModel,
}: {
	collectionModel: ColViewModel<ICollection>,
}) => {
	return (
		<ColModel viewModel={collectionModel}/>
	);
};
