import { map } from "lodash/fp";
import React, { SyntheticEvent } from "react";

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
	cancel?: <T extends IColDataModel>(item: T) => void,
	remove?: () => void,
	reset?: <T extends IColDataModel>(item: T) => void,
	submit?: <T extends IColDataModel>(item: T) => void,
	viewModel: ColViewModel<IColDataModel>,
}) => {
	return (
		<form id="col-form"
			onReset={() => {
				viewModel.reset(reset);
			}}
			onSubmit={(event: SyntheticEvent) => {
				event.preventDefault();
				viewModel.submit(submit);
			}}
		>
			{map(
				(dataView) => {
					switch (dataView.type) {
						case "STRING":
							return <ColTextInput key={dataView.key} autoFocus={true}
								onChange={(value: string) => viewModel.update({
									[dataView.key]: value,
								})}
								value={viewModel.updatedDataModel[dataView.key] as string}
							/>;
						default:
							return null;
					}
				},
				viewModel.dataViews,
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
