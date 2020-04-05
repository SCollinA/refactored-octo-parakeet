import { useQuery } from "@apollo/react-hooks";
import { find, get, map, flow, filter } from "lodash/fp";
import React, { useContext } from "react";

import { GET_COLLECTIONS } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";
import ColCard from "../../components-collin/layout/card/ColCard";
import ColPlaceholder from "../../components-collin/layout/placeholder/ColPlaceholder";

import { AdminContext } from "../admin/AdminContext";
import Loading from "../loading/Loading";

import { CollectionContext } from "./CollectionContext";
import Collection from "./collection/Collection";
import CollectionCreate from "./collection/create/CollectionCreate";

import "./Collections.scss";

export default () => {
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedCollectionId,
		selectedHoopId,
	} = useContext(CollectionContext);
	const {
		data,
		loading,
	} = useQuery(GET_COLLECTIONS);
	const collections: ICollection[] = get(["Collection"], data);
	return (
		<div className="collections">
			<Loading loading={loading}>
				{/* TODO: Add batch edit button here */}
				{!!selectedCollectionId ?
					<Collection collection={find(
							({id}) => id === selectedCollectionId,
							collections,
						)}
					/> :
					<>
						{!get("length", collections) &&
							<ColCard>
								<ColPlaceholder text={"No collections found"}/>
							</ColCard>}
						{!selectedHoopId && flow(
							filter((collection: ICollection) =>
								isLoggedIn || !!get(["hoops", "length"], collection),
							),
							map((collection) =>
								<Collection key={collection.id}
									collection={collection}
								/>,
							),
						)(collections)}
						{isLoggedIn && !selectedHoopId &&
							<CollectionCreate/>}
					</>
				}
			</Loading>
		</div>
	);
};
