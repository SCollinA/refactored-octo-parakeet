import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash/fp";
import React, { useContext } from "react";

import ColImage from "../../../components-collin/model/data/image/read-only/ColImage";

import { LoadingContext } from "../../layout/loading/Loading";

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
	const { setLoading } = useContext(LoadingContext);
	const {
		data,
		loading: dataLoading,
	}: any = useQuery(imageQuery, {
		fetchPolicy: "cache-first",
		variables: { id },
	});
	image = image || get(imageQueryImagePath, data) || "";
	setLoading(dataLoading, "ImageDB");
	return (
		<div className="image-db">
			<ColImage imageSrc={`data:image/jpeg;base64,${image}`}
				imageAlt={imageAltText}
			/>
		</div>
	);
};
