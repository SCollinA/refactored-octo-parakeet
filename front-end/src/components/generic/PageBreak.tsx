import React from "react";

export default ({ vertical = false }: { vertical?: boolean }) =>
	<div className="page-break-container">
		<div className={`page-break${vertical ? " page-break--vertical" : ""}`}
		></div>
	</div>;
