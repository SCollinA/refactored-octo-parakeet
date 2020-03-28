import React from "react";

import "../../ColData.css";

import "./ColImage.css";

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
