import { useMutation } from "@apollo/react-hooks";
import { map, mapKeys, mapValues } from "lodash/fp";
import React from "react";

import { UPDATE_COLLECTION } from "../../../../graphql/mutations";
import { ICollection } from "../../../../models/collection.model";

import ColForm from "../../../generic/inputs/form/ColForm";
import ColLoading from "../../../generic/loading/ColLoading";
import { IColDataModel } from "../../../generic/viewModelStore/ColDataModel";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";
import { scrubData } from "../../../utils/functions/scrubData";

export default ({
	cancel = () => undefined,
	collection,
	reset = () => undefined,
	submit = () => undefined,
}: {
	cancel: <T extends IColDataModel>(collection: T) => void,
	collection: ICollection,
	reset?: <T extends IColDataModel>(collection: T) => void,
	submit?: <T extends IColDataModel>(collection: T) => void,
}) => {
	const [
		updateCollection,
		{ loading },
	] = useMutation(UPDATE_COLLECTION, {
		variables: { id: collection.id },
	});
	const scrubbedCollection = scrubData<ICollection>(collection);
	const placeholders = washCollection(scrubbedCollection);
	const viewModel = new ColViewModel(scrubbedCollection, placeholders);
	return (
		<ColLoading text={"hallie's • hoops •"}
			loading={loading}
			fitChild={true}
			preventClick={false}
		>
			<ColForm viewModel={viewModel}
				cancel={(cancelledCollection) => cancel(cancelledCollection)}
				reset={(resetCollection) => reset(resetCollection)}
				submit={(submittedCollection) => {
					updateCollection({
						variables: {
							...submittedCollection,
						},
					});
					submit(submittedCollection);
				}}
			/>
		</ColLoading>
	);
};

const washCollection = (collection: ICollection): ICollection => {
	return {
		id: collection.id,
		name: collection.name || "",
	};
};
