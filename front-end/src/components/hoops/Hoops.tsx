import { useQuery } from "@apollo/react-hooks";
import { find, get, map } from "lodash/fp";
import React, { useContext, useState } from "react";

import { GET_COLLECTION_WITH_HOOPS, GET_HOOPS_WITHOUT_COLLECTIONS } from "../../graphql/queries";
import { IHoop } from "../../models/hoop.model";

import { AdminContext } from "../admin/AdminContext";
import Collections from "../collections/Collections";
import ColButton from "../generic/buttons/ColButton";
import ColLoading from "../generic/loading/ColLoading";

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
		hoops = get(["Collection", "hoops"], data);
		loading = collectionsLoading;
	}
	const { isLoggedIn } = useContext(AdminContext);
	const [selectedHoopId, setSelectedHoopId] = useState<string>("");
	return (
		<div className="hoops">
			<ColLoading text={"hallie's • hoops •"}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				{!!selectedHoopId ?
					<>
						<ColButton type="button"
							value="Back"
							action={() => setSelectedHoopId("")}
						/>
						<Hoop hoop={find(
								({id}) => id === selectedHoopId,
								hoops,
							)}
							isSelected={true}
						/>
						<Collections hoopId={selectedHoopId}/>
					</> :
					<>
						{map(
							(hoop) => <Hoop hoop={hoop}
								selectHoop={() => setSelectedHoopId(hoop.id)}
							/>,
							hoops,
						)}
					</>
				}
			</ColLoading>
		</div>
	);
};
