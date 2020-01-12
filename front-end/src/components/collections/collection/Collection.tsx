import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React, { useState } from "react";

import CollectionEdit from "./edit/CollectionEdit";
import CollectionReadOnly from "./read-only/CollectionReadOnly";

import ColButton from "../../generic/buttons/ColButton";
import ColLoading from "../../generic/loading/ColLoading";

import { GET_COLLECTION } from "../../../graphql/queries";
import { ICollection } from "../../../models/collection.model";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";

export default ({
	collectionId,
}: {
	collectionId?: string,
}) => {
	const {
		data,
		loading,
	} = useQuery(GET_COLLECTION, {
		variables: { id: collectionId },
	});
	const collection: ICollection = get(["getCollection"], data);
	if (!collection) {
		return <ColPlaceholder/>;
	}
	const [isEditing, setIsEditing] = useState(false);
	const className = `collection collection--${isEditing ? "edit" : "readonly"}`;
	return (
		<div className={className}>
			<ColLoading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				<ColButton type="button"
					name="editCollection"
					value="edit collection"
					action={() => setIsEditing(true)}
				/>
				{isEditing &&
					<CollectionEdit collection={collection}
						submit={() => setIsEditing(false)}
					/>}
				{!isEditing &&
					<CollectionReadOnly collection={collection}/>}
			</ColLoading>
		</div>
	);
};
