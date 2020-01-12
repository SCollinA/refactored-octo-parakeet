import React from "react";

import { ICollection } from "../../../../models/collection.model";

import ColForm from "../../../generic/inputs/form/ColForm";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";

export default ({
	collection,
	reset,
	submit,
}: {
	collection: ICollection,
	reset?: (collection: ICollection) => void,
	submit?: (collection: ICollection) => void,
}) => {
	const viewModel = new ColViewModel(collection);
	return <ColForm viewModel={viewModel}
		reset={reset}
		submit={submit}
	/>;
};
