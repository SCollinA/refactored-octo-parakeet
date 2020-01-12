import { useQuery } from "@apollo/react-hooks";
import { Dictionary } from "lodash";
import { get, map } from "lodash/fp";
import React, { useContext, useState } from "react";

import { GET_COLLECTIONS } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";

import { AdminContext } from "../admin/AdminContext";
import ColButton from "../generic/buttons/ColButton";
import Loading from "../generic/loading/ColLoading";

import Collection from "./collection/Collection";
import CollectionCreate from "./collection/create/CollectionCreate";

export default () => {
	const {
		data,
		loading,
	} = useQuery<Dictionary<ICollection[]>>(GET_COLLECTIONS);
	const collections = get(["Collection"], data);
	const { isLoggedIn } = useContext(AdminContext);
	const [selectedCollectionId, setSelectedCollection] = useState<string>("");
	return (
		<div className="collections">
			<Loading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				{/* TODO: Add batch edit button here */}
				{!!selectedCollectionId ? (
					<>
						<ColButton type="button"
							value="Back"
							action={() => setSelectedCollection("")}
						/>
						<Collection collectionId={selectedCollectionId}
							isSelected={true}
						/>
					</>
				) :
					<>
						{map(
							(collection) =>
								<Collection key={collection.id} collectionId={collection.id}
									selectCollection={() => setSelectedCollection(collection.id)}
								/>,
							collections,
						)}
						{isLoggedIn &&
							<CollectionCreate/>}
					</>
				}
			</Loading>
		</div>
	);
};
