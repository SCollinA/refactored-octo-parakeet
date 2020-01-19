import { get } from "lodash/fp";
import React, { useContext, useState } from "react";

import { ICollection } from "../../../models/collection.model";

import { AdminContext } from "../../admin/AdminContext";
import ColButton from "../../generic/buttons/ColButton";
import ColCard from "../../generic/layout/card/ColCard";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import ColViewModel from "../../generic/viewModelStore/ColViewModel";
import Hoops from "../../hoops/Hoops";
import { scrubData } from "../../utils/functions/scrubData";

import { CollectionContext } from "../Collections";

import CollectionEdit from "./edit/CollectionEdit";
import CollectionReadOnly from "./read-only/CollectionReadOnly";

export default ({
	collection,
}: {
	collection?: ICollection,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedCollectionId,
		selectedHoopId,
		setSelectedCollectionId,
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
		return (
			<div className={`collection${selectedClass}${editingClass}`}
				onClick={() => setSelectedCollectionId(collection.id)}
			>
				{!selectedHoopId &&
					<ColCard clickable={!isSelected}>
						{isSelected &&
							<ColButton type="button"
								value="Back"
								action={() => setSelectedCollectionId("")}
							/>}
						{isLoggedIn && isSelected && !isEditing &&
							<ColButton type="button"
								value="edit collection"
								action={() => setIsEditing(true)}
							/>}
						{isLoggedInAndEditing &&
							<CollectionEdit collectionModel={collectionModel}
								cancel={() => setIsEditing(false)}
								submit={() => setIsEditing(false)}
							/>}
						{!isEditing &&
							<CollectionReadOnly collectionModel={collectionModel}/>}
					</ColCard>}
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
