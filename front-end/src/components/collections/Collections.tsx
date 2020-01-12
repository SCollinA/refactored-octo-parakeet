import { useQuery } from "@apollo/react-hooks";
import { Dictionary } from "lodash";
import { get, map } from "lodash/fp";
import React, { useContext, useState } from "react";

import { GET_COLLECTIONS } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";

import { AdminContext } from "../admin/AdminContext";
import ColButton from "../generic/buttons/ColButton";
import Loading from "../generic/loading/ColLoading";
import Hoops from "../hoops/Hoops";

import Collection from "./collection/Collection";
import CollectionCreate from "./collection/create/CollectionCreate";

export default () => {
	const {
		data,
		loading,
	} = useQuery<Dictionary<ICollection[]>>(GET_COLLECTIONS);
	const collections = get(["Collection"], data);
	const { isLoggedIn } = useContext(AdminContext);
	const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
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
							action={() => setSelectedCollectionId("")}
						/>
						<Collection collectionId={selectedCollectionId}
							isSelected={true}
						/>
						<Hoops collectionId={selectedCollectionId}/>
					</>
				) :
					<>
						{map(
							(collection) =>
								<Collection key={collection.id} collectionId={collection.id}
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
			</Loading>
		</div>
	);
};
