import React, { createRef, useState, useEffect } from "react";

import ColLoading from "../../../../loading/ColLoading";

import "../../ColData.css";

import "./ColImage.scss";

export default ({
	imageAlt,
	imageSrc,
	initialLoading = false,
	loadingText = "* * * * * * *",
}: {
	imageAlt: string,
	imageSrc: string,
	initialLoading: boolean,
	loadingText: string,
}) => {
	const imageRef = createRef<HTMLImageElement>();
	const [windowAspectRatio, setWindowAspectRatio] = useState<number>(1);
	const [imageWidthPercent, setImageWidthPercent] = useState(0);
	const [loading, setLoading] = useState(initialLoading || !imageWidthPercent);
	const imageOnLoad = (image: HTMLImageElement | null) => {
		if (!!image) {
			const imageAspectRatio = image.width / image.height;
			const correctedAspectRatio = imageAspectRatio / windowAspectRatio;
			const newImageWidthPercent = correctedAspectRatio * 100;
			setImageWidthPercent(newImageWidthPercent);
		}
	};
	useEffect(() => setLoading(!imageWidthPercent), [imageWidthPercent, windowAspectRatio])
	useEffect(() => {
		const image = imageRef.current;
		const updateWindowDimensions = () => {
			setWindowAspectRatio(window.innerWidth / window.innerHeight);
			imageOnLoad(image);
		};
		window.addEventListener("resize", updateWindowDimensions);
		return () => window.removeEventListener("resize", updateWindowDimensions);
	});
	return (
		<div className="col-image">
			<ColLoading text={loadingText}
				loading={loading}
				fitChild={true}
				preventClick={false}
			>
				<img ref={imageRef}
					src={imageSrc}
					alt={imageAlt}
					onLoad={() => imageOnLoad(imageRef.current)}
					style={!loading ? { width: `${imageWidthPercent}%`	}: {}}
				/>
			</ColLoading>
		</div>
	);
};
