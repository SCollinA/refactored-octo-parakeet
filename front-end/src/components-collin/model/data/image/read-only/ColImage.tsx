import React from "react";

import "../../ColData.css";

import "./ColImage.scss";

export default ({
	imageAlt,
	imageSrc,
}: {
	imageAlt: string,
	imageSrc: string,
}) => {
	return (
		<img className="col-image"
			src={imageSrc}
			alt={imageAlt}
		/>
	);
};
