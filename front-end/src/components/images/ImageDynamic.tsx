import React from "react";

import ImageDB from "./image-db/ImageDB";
import ImageFile from "./image-file/ImageFile";

import Placeholder from "../../components-collin/layout/placeholder/ColPlaceholder";

import { GET_HOOP_WITH_IMAGE } from "../../graphql/queries";
import { IHoop } from "../../models/hoop.model";

import "./ImageDynamic.scss";

export default ({
	hoop,
}: {
	hoop: IHoop,
}) => {
	if (!!hoop) {
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
				/>
			);
		} else if (!!hoop.file) {
			return (
				<ImageFile file={hoop.file}/>
			);
		}
	}
	return <Placeholder text="No image found"/>;
};
