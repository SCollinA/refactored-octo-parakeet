import Img from "gatsby-image";
import React, { useEffect, useState } from "react";

import Loading from "../../../components-collin/loading/ColLoading";

import { IImageFile } from "../../../models/file.model";

export default ({
	file,
	loadingText,
}: {
	file: IImageFile,
	loadingText: string,
}) => {
	const [windowAspectRatio, setWindowAspectRatio] = useState<number>(1);
	useEffect(() => {
		const updateWindowDimensions = () =>
			setWindowAspectRatio(window.innerWidth / window.innerHeight);
		window.addEventListener("resize", updateWindowDimensions);
		return () => window.removeEventListener("resize", updateWindowDimensions);
	});
	const correctedAspectRatio = file.childImageSharp.fluid.aspectRatio / windowAspectRatio;
	const imageWidthPercent = correctedAspectRatio * 100;
	const [loading, setLoading] = useState(false);
	if (!!file) {
		return (
			<Loading text={loadingText}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				<Img className="ImageFile"
					fluid={file.childImageSharp.fluid}
					onStartLoad={() => setLoading(true)}
					onLoad={() => setLoading(false)}
					style={{ width: `${imageWidthPercent}%` }}
				/>
			</Loading>
		);
	} else {
		throw new Error("Hoop file not found in ImageFile component");
	}
};
