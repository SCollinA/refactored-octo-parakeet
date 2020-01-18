import { map } from "lodash/fp";
import React, { SyntheticEvent, useState } from "react";

import ColButton from "../../buttons/ColButton";
import { IColDataModel } from "../../viewModelStore/ColDataModel";
import ColViewModel from "../../viewModelStore/ColViewModel";

import ColTextInput from "../ColText.input";

export default ({
	cancel,
	remove,
	reset,
	submit,
	viewModel,
}: {
	cancel?: () => void,
	remove?: () => void,
	reset?: () => void,
	submit?: () => void,
	viewModel: ColViewModel<IColDataModel>,
}) => {
	const [dataViews, setDataViews] = useState(viewModel.dataViews);
	return (
		<form id="col-form"
			onReset={() => viewModel.reset(reset)}
			onSubmit={(event: SyntheticEvent) => {
				event.preventDefault();
				return viewModel.submit(submit);
			}}
		>
			{map(
				(dataView) => {
					switch (dataView.type) {
						case "STRING":
							return <ColTextInput key={dataView.key} autoFocus={true}
								onChange={(value: string) => viewModel.update({
									[dataView.key]: value,
								}, ({dataViews: newDataViews}) =>
									setDataViews(newDataViews),
								)}
								value={dataView.value || dataView.placeholder}
							/>;
						default:
							return null;
					}
				},
				dataViews,
			)}
			<ColButton type="button"
				value="cancel"
				action={() => viewModel.reset(cancel)}
			/>
			<ColButton type="button"
				value="delete"
				action={() => viewModel.remove(remove)}
			/>
			<ColButton type="reset"
				value="reset"
			/>
			<ColButton type="submit"
				value="submit"
			/>
		</form>
	);
};
