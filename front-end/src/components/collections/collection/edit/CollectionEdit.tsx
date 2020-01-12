import React from "react";

import { ICollection } from "../../../../models/collection.model";

import ColForm from "../../../generic/inputs/form/ColForm";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";
import { scrubData } from "../../../utils/functions/scrubData";

export default ({
	cancel,
	collection,
	reset,
	submit,
}: {
	cancel: (collection: ICollection) => void,
	collection: ICollection,
	reset?: (collection: ICollection) => void,
	submit?: (collection: ICollection) => void,
}) => {
	const viewModel = new ColViewModel(scrubData<ICollection>(collection));
	return <ColForm viewModel={viewModel}
		cancel={cancel}
		reset={reset}
		submit={submit}
	/>;
};
