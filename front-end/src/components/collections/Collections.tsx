import { useQuery } from "@apollo/react-hooks";
import { find, get, map } from "lodash/fp";
import React, { createContext, useContext, useState } from "react";

import { GET_COLLECTIONS } from "../../graphql/queries";
import { ICollection } from "../../models/collection.model";
import ColCard from "../../components-collin/layout/card/ColCard";
import ColPlaceholder from "../../components-collin/layout/placeholder/ColPlaceholder";

import { AdminContext } from "../admin/AdminContext";
import Loading from "../loading/Loading";
import Hoops from "../hoops/Hoops";

import Collection from "./collection/Collection";
import CollectionCreate from "./collection/create/CollectionCreate";

import "./Collections.scss";

export interface ICollectionContext {
	selectedCollectionId: string;
	selectedHoopId: string;
	setSelectedCollectionId: (selectedCollectionId: string) => void;
	setSelectedHoopId: (selectedCollectionId: string) => void;
}

export const CollectionContext = createContext<ICollectionContext>({
	selectedCollectionId: "",
	selectedHoopId: "",
	setSelectedCollectionId: () => null,
	setSelectedHoopId: () => null,
});

export default () => {
	const { isLoggedIn } = useContext(AdminContext);
	const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
	const [selectedHoopId, setSelectedHoopId] = useState<string>("");
	const context: ICollectionContext = {
		selectedCollectionId,
		selectedHoopId,
		setSelectedCollectionId,
		setSelectedHoopId,
	};
	const {
		data,
		loading,
	} = useQuery(GET_COLLECTIONS);
	const collections: ICollection[] = get(["Collection"], data);
	return (
		<div className="collections">
			<Loading loading={loading}>
				<CollectionContext.Provider value={context}>
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
							{!selectedHoopId && map(
								(collection) =>
									<Collection key={collection.id}
										collection={collection}
									/>,
								collections,
							)}
							{isLoggedIn && !selectedHoopId &&
								<CollectionCreate/>}
							{isLoggedIn &&
								<Hoops/>}
						</>
					}
				</CollectionContext.Provider>
			</Loading>
		</div>
	);
};
