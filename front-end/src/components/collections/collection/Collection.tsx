import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React, { useContext } from "react";

import { DELETE_COLLECTION, UPDATE_COLLECTION } from "../../../graphql/mutations";
import { GET_COLLECTIONS } from "../../../graphql/queries";
import { ICollection } from "../../../models/collection.model";

import { AdminContext } from "../../admin/AdminContext";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import ColLoading from "../../generic/loading/ColLoading";
import ColModel from "../../generic/model/ColModel";
import Hoops from "../../hoops/Hoops";
import { scrubData } from "../../utils/functions/scrubData";
import { washData } from "../../utils/functions/washData";

import { CollectionContext } from "../Collections";

import "./Collection.css";

export default ({
	collection,
}: {
	collection?: ICollection,
}) => {
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedCollectionId,
		setSelectedCollectionId,
		setSelectedHoopId,
	} = useContext(CollectionContext);
	const isSelected = selectedCollectionId === get("id", collection);
	const selectedClass = isSelected ? " collection--selected" : "";
	if (!collection) {
		return <ColPlaceholder/>;
	} else {
		const scrubbedCollection = scrubData<ICollection>(collection);
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
			<div className={`collection${selectedClass}`}
				onClick={() => setSelectedCollectionId(collection.id)}
			>
				<ColLoading text={"hallie's • hoops •"}
					loading={loading}
					fitChild={true}
					preventClick={false}
				>
					<ColModel dataModel={scrubbedCollection}
						isSelectable={true}
						isSelected={isSelected}
						placeholders={{
							...placeholders,
							id: collection.id,
						}}
						select={() => setSelectedCollectionId(collection.id)}
						unselect={() => {
							setSelectedHoopId("");
							setSelectedCollectionId("");
						}}
						isEditable={isLoggedIn && isSelected}
						onRemove={() => {
							removeCollection();
							setSelectedHoopId("");
							setSelectedCollectionId("");
						}}
						onSubmit={(updatedCollection: ICollection) => updateCollection({
							variables: {
								...washData(updatedCollection),
							},
						})}
					/>
				</ColLoading>
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
