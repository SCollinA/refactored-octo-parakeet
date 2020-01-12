import { mapKeys, mapValues } from "lodash/fp";
import React from "react";

import { ICollection } from "../../../../models/collection.model";

import ColForm from "../../../generic/inputs/form/ColForm";
import { IColDataModel } from "../../../generic/viewModelStore/ColDataModel";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";
import { scrubData } from "../../../utils/functions/scrubData";

export default ({
	cancel,
	collection,
	reset,
	submit,
}: {
	cancel: <T extends IColDataModel>(collection: T) => void,
	collection: ICollection,
	reset?: <T extends IColDataModel>(collection: T) => void,
	submit?: <T extends IColDataModel>(collection: T) => void,
}) => {
	const scrubbedCollection = scrubData<ICollection>(collection);
	const placeholders = washCollection(scrubbedCollection);
	const viewModel = new ColViewModel(scrubbedCollection, placeholders);
	return <ColForm viewModel={viewModel}
		cancel={cancel}
		reset={reset}
		submit={submit}
	/>;
};

const washCollection = (collection: ICollection): ICollection => {
	return {
		id: collection.id,
		name: collection.name || "",
	};
};
