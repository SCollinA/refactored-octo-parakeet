import { useMutation } from "@apollo/react-hooks";
import { get, set } from "lodash/fp";
import React, { useContext } from "react";

import { CREATE_HOOP, MERGE_COLLECTION_HOOPS } from "../../../../graphql/mutations";
import { GET_COLLECTION_WITH_HOOPS, GET_HOOPS_WITHOUT_COLLECTIONS } from "../../../../graphql/queries";
import { ICollection } from "../../../../models/collection.model";
import { IHoop } from "../../../../models/hoop.model";

import { CollectionContext } from "../../../collections/Collections";
import ColButton from "../../../../components-collin/buttons/ColButton";
import ColLoading from "../../../../components-collin/loading/ColLoading";

import "./HoopCreate.scss";

export default () => {
	const {
		selectedCollectionId,
	} = useContext(CollectionContext);
	const [
		createHoop,
		{ loading: createLoading },
	] = useMutation(CREATE_HOOP, {
		onCompleted(data) {
			const newHoop: IHoop = get(
				"CreateHoop",
				data,
			);
			if (!!selectedCollectionId) {
				mergeCollectionHoops({
					variables: {
						collectionId: selectedCollectionId,
						hoopId: newHoop.id,
					},
				});
			}
		},
		update(cache, { data }) {
			if (!selectedCollectionId) {
				const newHoop: IHoop = get(
					"CreateHoop",
					data,
				);
				const cachedData = cache.readQuery<{ Hoop: IHoop[] }>({
					query: GET_HOOPS_WITHOUT_COLLECTIONS,
				}) || { Hoop: [] };
				const cachedHoops = get(["Hoop"], cachedData);
				const updatedHoops = [
					...cachedHoops,
					newHoop,
				];
				const updatedData = set(["Hoop"], updatedHoops, cachedData);
				cache.writeQuery({
					data: updatedData,
					query: GET_HOOPS_WITHOUT_COLLECTIONS,
				});
			}
		},
	});
	const [
		mergeCollectionHoops,
		{ loading: connectLoading },
	] = useMutation(MERGE_COLLECTION_HOOPS, {
		update(cache, { data }) {
			const newCollection = get(["from"], data);
			const cachedData = cache.readQuery<{ Collection: { Hoop: IHoop[] }}>({
				query: GET_COLLECTION_WITH_HOOPS,
				variables: { id: selectedCollectionId },
			}) || { Collection: { Hoop: [] }};
			const cachedCollection = get(["Collection", "0"], cachedData);
			const updatedCollecton: ICollection = {
				...cachedCollection,
				...newCollection,
			};
			const updatedData = set(["Collection", "0"], updatedCollecton, cachedData);
			cache.writeQuery({
				data: updatedData,
				query: GET_COLLECTION_WITH_HOOPS,
				variables: { id: selectedCollectionId },
			});
		},
	});
	const loading = createLoading || connectLoading;
	return (
		<div className={`hoop-create`}>
			<ColLoading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				<ColButton type="button"
					value="add hoop"
					action={() => createHoop()}
				/>
			</ColLoading>
		</div>
	);
};
