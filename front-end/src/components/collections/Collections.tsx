import { useQuery } from "@apollo/react-hooks";
import { Dictionary } from "lodash";
import { find, get, map } from "lodash/fp";
import React, { useContext, useState } from "react";

import { GET_COLLECTIONS, GET_HOOP_FULL } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";

import { AdminContext } from "../admin/AdminContext";
import ColButton from "../generic/buttons/ColButton";
import ColLoading from "../generic/loading/ColLoading";
import Hoops from "../hoops/Hoops";

import Collection from "./collection/Collection";
import CollectionCreate from "./collection/create/CollectionCreate";

export default ({
	hoopId,
}: {
	hoopId?: string,
}) => {
	let collections: ICollection[];
	let loading: boolean;
	if (!hoopId) {
		const {
			data,
			loading: collectionsLoading,
		} = useQuery(GET_COLLECTIONS);
		collections = get(["Collection"], data);
		loading = collectionsLoading;
	} else {
		const {
			data,
			loading: hoopLoading,
		} = useQuery(GET_HOOP_FULL);
		collections = get(["Hoop", "collections"], data);
		loading = hoopLoading;

	}
	const { isLoggedIn } = useContext(AdminContext);
	const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
	return (
		<div className="collections">
			<ColLoading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				{/* TODO: Add batch edit button here */}
				{!!selectedCollectionId ? (
					<>
						<ColButton type="button"
							value="Back"
							action={() => setSelectedCollectionId("")}
						/>
						<Collection collection={find(
								({id}) => id === selectedCollectionId,
								collections,
							)}
							isSelected={true}
						/>
						<Hoops collectionId={selectedCollectionId}/>
					</>
				) :
					<>
						{map(
							(collection) =>
								<Collection key={collection.id} collection={collection}
									selectCollection={() => setSelectedCollectionId(collection.id)}
								/>,
							collections,
						)}
						{isLoggedIn &&
							<>
								<CollectionCreate/>
								<Hoops/>
							</>}
					</>
				}
			</ColLoading>
		</div>
	);
};
