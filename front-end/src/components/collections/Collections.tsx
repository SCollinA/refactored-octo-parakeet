import { useQuery } from "@apollo/react-hooks";
import { Dictionary } from "lodash";
import { get, map } from "lodash/fp";
import React, { useContext } from "react";

import { GET_COLLECTIONS } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";

import { AdminContext } from "../admin/AdminContext";
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
	return (
		<div className="Collections">
			<Loading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				{/* TODO: Add batch edit button here */}
				{map(
					(collection) =>
						<Collection key={collection.id} collectionId={collection.id}/>,
					collections,
				)}
				{isLoggedIn &&
					<CollectionCreate/>}
			</Loading>
		</div>
	);
};
