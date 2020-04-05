import Img from "gatsby-image";
import React, {
	// useEffect,
	useContext,
} from "react";

import { IImageFile } from "../../../models/file.model";

import { LoadingContext } from "../../layout/loading/Loading";

import "./ImageFile.scss";

export default ({
	file,
}: {
	file: IImageFile,
}) => {
	// const [windowAspectRatio, setWindowAspectRatio] = useState<number>(1);
	// useEffect(() => {
		// const updateWindowDimensions = () =>
			// setWindowAspectRatio(window.innerWidth / window.innerHeight);
	// 	window.addEventListener("resize", updateWindowDimensions);
	// 	return () => window.removeEventListener("resize", updateWindowDimensions);
	// });
	// const correctedAspectRatio = file.childImageSharp.fluid.aspectRatio / windowAspectRatio;
	// const imageWidthPercent = correctedAspectRatio * 100;
	if (!!file) {
		const { setLoading } = useContext(LoadingContext);
		return <Img className="image-file"
			fluid={file.childImageSharp.fluid}
			onStartLoad={() => setLoading(true, "ImageFile")}
			onLoad={() => setLoading(false, "ImageFile")}
			// style={{ width: `${imageWidthPercent}%` }}
		/>;
	} else {
		throw new Error("Hoop file not found in ImageFile component");
	}
};
