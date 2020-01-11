import Img from "gatsby-image";
import React, { useState } from "react";

import Loading from "../../generic/loading/Loading";

import { IImageFile } from "../../../models/file.model";

export default ({
	windowAspectRatio,
	file,
	loadingText,
}: {
	windowAspectRatio: number,
	file: IImageFile,
	loadingText: string,
}) => {
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
