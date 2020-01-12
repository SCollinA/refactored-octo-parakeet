import React from "react";

import { ICollection } from "../../../../models/collection.model";

export default ({
	collection,
}: {
	collection: ICollection,
}) => {
	return (
		<>
			<text className="collection__name">
				{collection.name}
			</text>
		</>
	);
};
