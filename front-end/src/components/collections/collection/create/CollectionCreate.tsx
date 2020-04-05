import { useMutation } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React, { useContext } from "react";

import { CREATE_COLLECTION } from "../../../../graphql/mutations";
import { GET_COLLECTIONS } from "../../../../graphql/queries";
import ColButton from "../../../../components-collin/buttons/ColButton";

import { LoadingContext } from "../../../layout/loading/Loading";

import { CollectionContext } from "../../CollectionContext";

import "./CollectionCreate.scss";

export default () => {
	const { setLoading } = useContext(LoadingContext);
	const {
		setSelectedCollectionId,
	} = useContext(CollectionContext);
	const [
		createCollection,
		{ loading },
	] = useMutation(CREATE_COLLECTION, {
		update(cache, { data }) {
			const cachedData = cache.readQuery({
				query: GET_COLLECTIONS,
			});
			const cachedCollections = get(
				"Collection",
				cachedData,
			);
			const newCollection = get(
				"CreateCollection",
				data,
			);
			const updatedCollections = [
				...cachedCollections,
				newCollection,
			];
			cache.writeQuery({
				data: { Collection: updatedCollections },
				query: GET_COLLECTIONS,
			});
			setSelectedCollectionId(newCollection.id);
			setLoading(false, "CollectionCreate");
		},
	});
	setLoading(loading, "CollectionCreate");
	return (
		<div className={`collection-create`}>
			<ColButton type="button"
				value="add collection"
				action={() => createCollection()}
			/>
		</div>
	);
};
