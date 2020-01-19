import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React from "react";

import { DELETE_COLLECTION, UPDATE_COLLECTION } from "../../../../graphql/mutations";
import { GET_COLLECTIONS } from "../../../../graphql/queries";
import { ICollection } from "../../../../models/collection.model";

import ColLoading from "../../../generic/loading/ColLoading";
import ColForm from "../../../generic/model/edit/ColModel.edit";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";

export default ({
	cancel = () => undefined,
	collectionModel,
	remove = () => undefined,
	reset = () => undefined,
	submit = () => undefined,
}: {
	cancel: () => void,
	collectionModel: ColViewModel<ICollection>,
	remove?: () => void,
	reset?: () => void,
	submit?: () => void,
}) => {
	const [
		updateCollection,
		{ loading: updateLoading },
	] = useMutation(UPDATE_COLLECTION, {
		variables: { id: collectionModel.id },
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
				({ id }: ICollection) => collectionModel.id !== id,
				cachedCollections,
			);
			cache.writeQuery({
				data: { Collection: updatedCollections },
				query: GET_COLLECTIONS,
			});
		},
		variables: { id: collectionModel.id },
	});
	const loading = updateLoading || removeLoading;
	return (
		<ColLoading text={"hallie's • hoops •"}
			loading={loading}
			fitChild={true}
			preventClick={false}
		>
			<ColForm viewModel={collectionModel}
				cancel={() => cancel()}
				remove={() => {
					removeCollection();
					remove();
				}}
				reset={() => reset()}
				submit={() => {
					updateCollection({
						variables: {
							...collectionModel.updatedDataModel,
						},
					});
					submit();
				}}
			/>
		</ColLoading>
	);
};
