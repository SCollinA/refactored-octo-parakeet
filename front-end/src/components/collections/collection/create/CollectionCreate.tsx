import { useMutation } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React from "react";

import { CREATE_COLLECTION } from "../../../../graphql/mutations";
import { GET_COLLECTIONS } from "../../../../graphql/queries";
import ColButton from "../../../../components-collin/buttons/ColButton";

import Loading from "../../../loading/Loading";

import "./CollectionCreate.scss";

export default () => {
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
		},
	});
	return (
		<div className={`collection-create`}>
			<Loading loading={loading}
				fitChild={true}
				preventClick={false}
			>
				<ColButton type="button"
					value="add collection"
					action={() => createCollection()}
				/>
			</Loading>
		</div>
	);
};
