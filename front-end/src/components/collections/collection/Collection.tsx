import React, { useContext, useState } from "react";

import CollectionEdit from "./edit/CollectionEdit";
import CollectionReadOnly from "./read-only/CollectionReadOnly";

import { AdminContext } from "../../admin/AdminContext";
import ColButton from "../../generic/buttons/ColButton";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";

import { ICollection } from "../../../models/collection.model";
import ColCard from "../../generic/layout/card/ColCard";
import Hoops from "../../hoops/Hoops";

export default ({
	collection,
	isSelected,
	selectCollection = () => undefined,
}: {
	collection?: ICollection,
	isSelected?: boolean,
	selectCollection?: () => void,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoggedIn } = useContext(AdminContext);
	const isLoggedInAndEditing = isLoggedIn && isEditing;
	const selectedClass = isSelected ? " collection--selected" : "";
	const editingClass = ` collection--${isLoggedInAndEditing ? "edit" : "readonly"}`;
	if (!collection) {
		return <ColPlaceholder/>;
	} else {
		return (
			<div className={`collection${selectedClass}${editingClass}`}
				onClick={() => selectCollection()}
			>
				<ColCard clickable={!isSelected}>
					{isLoggedIn && isSelected && !isEditing &&
						<ColButton type="button"
							value="edit collection"
							action={() => setIsEditing(true)}
						/>}
					{isLoggedInAndEditing &&
						<CollectionEdit collection={collection}
							cancel={() => setIsEditing(false)}
							submit={() => setIsEditing(false)}
						/>}
					{!isEditing &&
						<CollectionReadOnly collection={collection}/>}
					{isSelected &&
						<Hoops collectionId={collection.id}/>}
				</ColCard>
			</div>
		);
	}
};
