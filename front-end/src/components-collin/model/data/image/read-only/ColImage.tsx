import React, { createRef, useState, useEffect } from "react";
import {
	throttle,
} from "lodash/fp";

import ColPlaceholder from "../../../../layout/placeholder/ColPlaceholder";
import { isImageEmpty } from "../../../../utils/image.utils";

import "../../ColData.scss";

import "./ColImage.scss";

export default ({
	imageAlt,
	imageSrc,
}: {
	imageAlt: string,
	imageSrc: string,
}) => {
	if (isImageEmpty(imageSrc)) {
		return <ColPlaceholder></ColPlaceholder>
	}
	const imageRef = createRef<HTMLImageElement>();
	const [imageWidthPercent, setImageWidthPercent] = useState(1);
	const imageOnLoad = throttle(250, (image: HTMLImageElement | null) => {
		if (!!image) {
			const aspectRatio = image.width / image.height;
			let newWidth = image.width;
			let newHeight = image.height;
			newWidth = window.innerWidth;
			newHeight = newWidth / aspectRatio;
			newHeight = window.innerHeight;
			newWidth = aspectRatio * newHeight;
			let newImageWidthPercent = (newWidth / image.width) * imageWidthPercent;
			if (newImageWidthPercent > 1) {
				newImageWidthPercent = 1;
			}
			setImageWidthPercent(newImageWidthPercent);
		}
	});
	useEffect(() => {
		const resizeImage = () => imageOnLoad(imageRef.current);
		window.addEventListener("resize", resizeImage);
		return () => window.removeEventListener("resize", resizeImage);
	});
	return (
		<img className="col-image"
			ref={imageRef}
			src={imageSrc}
			alt={imageAlt}
			onLoad={() => imageOnLoad(imageRef.current)}
			style={{ width: `${imageWidthPercent * 100}%` }}
		/>
	);
};
