import { useQuery } from "@apollo/react-hooks";
import { find, get, map } from "lodash/fp";
import React, { useContext } from "react";

import { GET_COLLECTION_WITH_HOOPS, GET_HOOPS_WITHOUT_COLLECTIONS } from "../../graphql/queries";
import { IHoop } from "../../models/hoop.model";

import { AdminContext } from "../admin/AdminContext";
import { LoadingContext } from "../layout/loading/Loading";
import { CollectionContext } from "../collections/CollectionContext";

import HoopCreate from "./hoop/create/HoopCreate";
import Hoop from "./hoop/Hoop";

import "./Hoops.scss";

export default () => {
	const { isLoggedIn } = useContext(AdminContext);
	const { setLoading } = useContext(LoadingContext);
	const {
		selectedCollectionId,
		selectedHoopId,
	} = useContext(CollectionContext);
	let hoops: IHoop[];
	let loading: boolean;
	if (!selectedCollectionId) {
		if (!isLoggedIn) {
			return null;
		}
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
			variables: { id: selectedCollectionId },
		});
		hoops = get(["Collection", "0", "hoops"], data);
		loading = collectionsLoading;
	}
	setLoading(loading, "Hoops");
	return (
		<div className="hoops">
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
		</div>
	);
};
