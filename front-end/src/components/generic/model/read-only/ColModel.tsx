import {
	map,
} from "lodash/fp";
import React, { ReactNode } from "react";

import ColCard from "../../layout/card/ColCard";
import { IColDataModel } from "../../viewModelStore/ColDataModel";
import ColViewModel from "../../viewModelStore/ColViewModel";

import ColBoolean from "../data/boolean/read-only/ColBoolean";
import ColImage from "../data/image/read-only/ColImage";
import ColNumber from "../data/number/read-only/ColNumber";
import ColStringLong from "../data/string-long/read-only/ColStringLong";
import ColString from "../data/string/read-only/ColString";

import "./ColModel.css";

export default ({
	viewModel,
}: {
	viewModel: ColViewModel<IColDataModel>,
}) => {
	console.log("view model", viewModel)
	return (
		<div className="col-model">
			{map(
				(dataView) => {
					const dataViewLayout = (view: ReactNode) => (
						<ColCard key={dataView.key}>
							<span>{dataView.key}</span>
							{view}
						</ColCard>
					);
					switch (dataView.type) {
						case "STRING":
							console.log("data view type string", dataView.value)
							return dataViewLayout(
								<ColString text={dataView.value}/>,
							);
						case "STRING_LONG":
							return dataViewLayout(
								<ColStringLong text={dataView.value}/>,
							);
						case "BOOLEAN":
							return dataViewLayout(
								<ColBoolean isTrue={dataView.value}
									affirmativeText={dataView.key}
									negativeText={`not ${dataView.key}`}
								/>,
							);
						case "INTEGER":
						case "FLOAT":
							return dataViewLayout(
								<ColNumber value={dataView.value}/>,
							);
						case "IMAGE":
							return dataViewLayout(
								<ColImage imageSrc={dataView.value}
									imageAlt={dataView.key}
								/>,
							);
					}
				},
				viewModel.dataViews,
			)}
		</div>
	);
};
