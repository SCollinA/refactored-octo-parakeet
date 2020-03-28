import React from "react";

import ImageDB from "./image-db/ImageDB";
import ImageFile from "./image-file/ImageFile";

import Placeholder from "../../components-collin/layout/placeholder/ColPlaceholder";

import { GET_HOOP_WITH_IMAGE } from "../../graphql/queries";
import { IHoop } from "../../models/hoop.model";

export default ({
	hoop,
}: {
	hoop: IHoop,
}) => {
	if (!!hoop) {
		const loadingText = "hallie's • hoops •";
		if (
			hoop.recentlyupdatedimage ||
			!!hoop.image
		) {
			return (
				<ImageDB id={hoop.id}
					image={hoop.image}
					imageAltText={hoop.title}
					imageQuery={GET_HOOP_WITH_IMAGE}
					imageQueryImagePath={["getHoop", "Hoop", "image"]}
					loadingText={loadingText}
				/>
			);
		} else if (!!hoop.file) {
			return (
				<ImageFile file={hoop.file}
					loadingText={loadingText}
				/>
			);
		}
	}
	return <Placeholder text="No image found"/>;
};
