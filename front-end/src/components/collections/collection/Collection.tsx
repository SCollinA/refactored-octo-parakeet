import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React, { useContext, useState } from "react";

import CollectionEdit from "./edit/CollectionEdit";
import CollectionReadOnly from "./read-only/CollectionReadOnly";

import { AdminContext } from "../../admin/AdminContext";
import ColButton from "../../generic/buttons/ColButton";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import ColLoading from "../../generic/loading/ColLoading";

import { GET_COLLECTION } from "../../../graphql/queries";
import { ICollection } from "../../../models/collection.model";

export default ({
	collectionId,
}: {
	collectionId?: string,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoggedIn } = useContext(AdminContext);
	const {
		data,
		loading,
	} = useQuery(GET_COLLECTION, {
		variables: { id: collectionId },
	});
	const collection: ICollection = get(["Collection", "0"], data);
	const isLoggedInAndEditing = isLoggedIn && isEditing;
	const className = `collection collection--${isLoggedInAndEditing ? "edit" : "readonly"}`;
	if (!collection) {
		return <ColPlaceholder/>;
	} else {
		return (
			<div className={className}>
				<ColLoading text={"hallie's • hoops •"}
					loading={loading}
					fitChild={true}
					preventClick={false}
				>
					{isLoggedIn && <ColButton type="button"
						name="editCollection"
						value="edit collection"
						action={() => setIsEditing(true)}
					/>}
					{isLoggedInAndEditing &&
						<CollectionEdit collection={collection}
							submit={() => setIsEditing(false)}
							cancel={() => setIsEditing(false)}
						/>}
					{!isEditing &&
						<CollectionReadOnly collection={collection}/>}
				</ColLoading>
			</div>
		);
	}
};
