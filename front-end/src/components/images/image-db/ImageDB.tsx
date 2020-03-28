import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React, { createRef, useEffect, useState } from "react";

import Loading from "../../../generic/loading/ColLoading";

export default ({
	id,
	image,
	imageAltText,
	imageQuery,
	imageQueryImagePath,
	loadingText,
}: {
	id: string,
	image?: string,
	imageAltText: string,
	imageQuery: any,
	imageQueryImagePath: string[],
	loadingText: string,
}) => {
	const {
		data,
		loading: dataLoading,
	}: any = useQuery(imageQuery, {
		fetchPolicy: "cache-first",
		variables: { id },
	});
	image = image || get(imageQueryImagePath, data) || "";
	const imageRef = createRef<HTMLImageElement>();
	const [windowAspectRatio, setWindowAspectRatio] = useState<number>(1);
	useEffect(() => {
		const updateWindowDimensions = () =>
			setWindowAspectRatio(window.innerWidth / window.innerHeight);
		window.addEventListener("resize", updateWindowDimensions);
		return () => window.removeEventListener("resize", updateWindowDimensions);
	});
	const [imageWidthPercent, setImageWidthPercent] = useState(0);
	const imageOnLoad = () => {
		const imageDB = imageRef.current;
		if (!!imageDB) {
			const imageAspectRatio = imageDB.width / imageDB.height;
			const correctedAspectRatio = imageAspectRatio / windowAspectRatio;
			const newImageWidthPercent = correctedAspectRatio * 100;
			setImageWidthPercent(newImageWidthPercent);
		}
	};
	const loading = dataLoading || !!imageWidthPercent;
	return (
		<Loading text={loadingText}
			loading={loading}
			fitChild={true}
			preventClick={false}
		>
			<img ref={imageRef} className="ImageDB"
				src={`data:image/jpeg;base64,${image}`}
				alt={imageAltText}
				onLoad={imageOnLoad}
				style={{ width: `${imageWidthPercent}%`	}}
			/>
		</Loading>
	);
};
