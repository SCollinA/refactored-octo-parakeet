import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React from "react";

import ColImage from "../../../components-collin/model/data/image/read-only/ColImage";

import Loading from "../../loading/Loading";

import "./ImageDB.scss";

export default ({
	id,
	image,
	imageAltText,
	imageQuery,
	imageQueryImagePath,
}: {
	id: string,
	image?: string,
	imageAltText: string,
	imageQuery: any,
	imageQueryImagePath: string[],
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
			<Loading loading={loading}>
				<ColImage imageSrc={`data:image/jpeg;base64,${image}`}
					imageAlt={imageAltText}
				/>
			</Loading>
		</div>
	);
};
