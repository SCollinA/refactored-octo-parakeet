import { useQuery } from "@apollo/react-hooks";
import { Dictionary } from "lodash";
import { get, map } from "lodash/fp";
import React, { createContext } from "react";

import Collection from "./collection/Collection";

import Loading from "../generic/loading/ColLoading";

import { GET_COLLECTIONS } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";

export const CollectionContext = createContext({
	collections: undefined,
});

export default () => {
	const {
		data,
		loading,
	} = useQuery<Dictionary<ICollection[]>>(GET_COLLECTIONS);
	const collections = get(["getCollections"], data);
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
						<Collection collectionId={collection.id}/>,
					collections,
				)}
			</Loading>
		</div>
	);
};
