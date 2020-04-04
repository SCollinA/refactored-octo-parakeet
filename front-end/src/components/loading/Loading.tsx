import React, { ReactNode } from "react";

import ColLoading from "../../components-collin/loading/ColLoading";

import "./Loading.scss";

export default ({
	children,
	loading,
	fitChild = true,
	preventClick = false,
}: {
	children: ReactNode,
	loading: boolean,
	fitChild?: boolean,
	preventClick?: boolean,
}) =>
	<ColLoading text={"hallie's • hoops •"}
		loading={true}
		fitChild={fitChild}
		preventClick={preventClick}
		children={children}
	></ColLoading>
