import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React from "react";

import ColImage from "../../../components-collin/model/data/image/read-only/ColImage";

import "./ImageDB.scss";
import ColLoading from "../../../components-collin/loading/ColLoading";

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
	const loading = dataLoading;
	return (
		<div className="image-db">
			<ColLoading loading={loading}
				text={loadingText}
				fitChild={true}
			>
				<ColImage imageSrc={`data:image/jpeg;base64,${image}`}
					imageAlt={imageAltText}
				/>
			</ColLoading>
		</div>
	);
};
