import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React, { useContext, useState } from "react";

import { DELETE_COLLECTION, UPDATE_COLLECTION } from "../../../graphql/mutations";
import { GET_COLLECTIONS } from "../../../graphql/queries";
import { ICollection } from "../../../models/collection.model";

import { AdminContext } from "../../admin/AdminContext";
import ColButton from "../../generic/buttons/ColButton";
import ColCard from "../../generic/layout/card/ColCard";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import ColLoading from "../../generic/loading/ColLoading";
import ColModel from "../../generic/model/ColModel";
import ColViewModel from "../../generic/viewModelStore/ColViewModel";
import Hoops from "../../hoops/Hoops";
import { scrubData } from "../../utils/functions/scrubData";

import { CollectionContext } from "../Collections";

import "./Collection.css";

export default ({
	collection,
}: {
	collection?: ICollection,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedCollectionId,
		setSelectedCollectionId,
		setSelectedHoopId,
	} = useContext(CollectionContext);
	const isSelected = selectedCollectionId === get("id", collection);
	const isLoggedInAndEditing = isLoggedIn && isEditing;
	const selectedClass = isSelected ? " collection--selected" : "";
	const editingClass = ` collection--${isLoggedInAndEditing ? "edit" : "readonly"}`;
	if (!collection) {
		return <ColPlaceholder/>;
	} else {
		const scrubbedCollection = scrubData<ICollection>(collection);
		const collectionModel = new ColViewModel<ICollection>(scrubbedCollection, {
			...placeholders,
			id: collection.id,
		});
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
		return (
			<div className={`collection${selectedClass}${editingClass}`}
				onClick={() => setSelectedCollectionId(collection.id)}
			>
				<ColCard clickable={!isSelected}>
					{isSelected &&
						<ColButton type="button"
							value="Back"
							action={() => {
								setSelectedHoopId("");
								setSelectedCollectionId("");
							}}
						/>}
					{isLoggedIn && isSelected && !isEditing &&
						<ColButton type="button"
							value="edit collection"
							action={() => setIsEditing(true)}
						/>}
					<ColLoading text={"hallie's • hoops •"}
						loading={loading}
						fitChild={true}
						preventClick={false}
					>
						<ColModel viewModel={collectionModel}
							cancel={() => setIsEditing(false)}
							isEditing={isLoggedInAndEditing}
							remove={() => {
								removeCollection();
								setSelectedHoopId("");
								setSelectedCollectionId("");
							}}
							submit={() => {
								updateCollection({
									variables: {
										...collectionModel.updatedDataModel,
									},
								});
								setIsEditing(false);
							}}
						/>
					</ColLoading>
				</ColCard>
				{isSelected &&
					<Hoops collectionId={collection.id}/>}
			</div>
		);
	}
};

const placeholders =  {
	id: "",
	name: "",
};
