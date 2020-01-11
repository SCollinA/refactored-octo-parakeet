import React, { useEffect, useState } from "react";

import ImageDB from "./image-db/ImageDB";
import ImageFile from "./image-file/ImageFile";

import Placeholder from "../generic/placeholder/Placeholder";

import { GET_HOOP_WITH_IMAGE } from "../../graphql/queries";
import { IHoop } from "../../models/hoop.model";

export default ({
	hoop,
}: {
	hoop: IHoop,
}) => {
	const [windowAspectRatio, setWindowAspectRatio] = useState();
	useEffect(() => {
		const updateWindowDimensions = () =>
			setWindowAspectRatio(window.innerWidth / window.innerHeight);
		window.addEventListener("resize", updateWindowDimensions);
		return () => window.removeEventListener("resize", updateWindowDimensions);
	});
	if (!!hoop) {
		const loadingText = "hallie's • hoops •";
		if (
			hoop.recentlyupdatedimage ||
			!!hoop.image
		) {
			return (
				<ImageDB id={hoop.id}
					windowAspectRatio={windowAspectRatio}
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
					windowAspectRatio={windowAspectRatio}
					loadingText={loadingText}
				/>
			);
		}
	} else {
		return <Placeholder text="No image found"/>;
	}
};
