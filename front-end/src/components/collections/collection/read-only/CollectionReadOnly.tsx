import React from "react";

import { ICollection } from "../../../../models/collection.model";
import ColPlaceholder from "../../../generic/layout/placeholder/ColPlaceholder";

export default ({
	collection,
}: {
	collection: ICollection,
}) => {
	return (
		<>
			{!!collection.name ?
				<p className="collection__name">
					{collection.name}
				</p> :
				<ColPlaceholder/>}
		</>
	);
};
