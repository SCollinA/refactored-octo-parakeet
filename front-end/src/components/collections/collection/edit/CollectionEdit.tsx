import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React from "react";

import { DELETE_COLLECTION, UPDATE_COLLECTION } from "../../../../graphql/mutations";
import { GET_COLLECTIONS } from "../../../../graphql/queries";
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
	cancel: () => void,
	collection: ICollection,
	reset?: () => void,
	submit?: () => void,
}) => {
	const [
		updateCollection,
		{ loading: updateLoading },
	] = useMutation(UPDATE_COLLECTION, {
		variables: { id: collection.id },
	});
	const [
		removeCollection,
		{ loading: removeLoading },
	] = useMutation(DELETE_COLLECTION, {
		update(cache) {
			const cachedData = cache.readQuery({
				query: GET_COLLECTIONS,
			});
			const cachedCollections = get(
				"Collection",
				cachedData,
			);
			const updatedCollections = filter(
				({ id }: ICollection) => collection.id !== id,
				cachedCollections,
			);
			cache.writeQuery({
				data: { Collection: updatedCollections },
				query: GET_COLLECTIONS,
			});
		},
		variables: { id: collection.id },
	});
	const loading = updateLoading || removeLoading;
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
				cancel={() => cancel()}
				remove={() => removeCollection()}
				reset={() => reset()}
				submit={() => {
					updateCollection({
						variables: {
							...viewModel.updatedDataModel,
						},
					});
					submit();
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
