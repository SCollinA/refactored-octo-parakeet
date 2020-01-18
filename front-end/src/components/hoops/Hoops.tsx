import { useQuery } from "@apollo/react-hooks";
import { find, get, map } from "lodash/fp";
import React, { useContext, useState } from "react";

import { GET_COLLECTION_WITH_HOOPS, GET_HOOPS_WITHOUT_COLLECTIONS } from "../../graphql/queries";
import { IHoop } from "../../models/hoop.model";

import { AdminContext } from "../admin/AdminContext";
import { CollectionContext } from "../collections/Collections";
import ColLoading from "../generic/loading/ColLoading";

import HoopCreate from "./hoop/create/HoopCreate";
import Hoop from "./hoop/Hoop";

import "./Hoops.css";

export default ({
	collectionId,
}: {
	collectionId?: string,
}) => {
	let hoops: IHoop[];
	let loading: boolean;
	if (!collectionId) {
		const {
			data,
			loading: hoopsLoading,
		} = useQuery(GET_HOOPS_WITHOUT_COLLECTIONS);
		hoops = get("Hoop", data);
		loading = hoopsLoading;
	} else {
		const {
			data,
			loading: collectionsLoading,
		} = useQuery(GET_COLLECTION_WITH_HOOPS, {
			variables: { id: collectionId },
		});
		hoops = get(["Collection", "0", "hoops"], data);
		loading = collectionsLoading;
	}
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedHoopId,
	} = useContext(CollectionContext);
	return (
		<div className="hoops">
			<ColLoading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				{!!selectedHoopId ?
					<Hoop hoop={find(
							({id}) => id === selectedHoopId,
							hoops,
						)}
					/> :
					<>
						{map(
							(hoop) => <Hoop key={hoop.id}
								hoop={hoop}
							/>,
							hoops,
						)}
						{isLoggedIn &&
							<HoopCreate/>}
					</>
				}
			</ColLoading>
		</div>
	);
};
