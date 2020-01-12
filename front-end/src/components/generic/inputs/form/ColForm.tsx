import React, { SyntheticEvent } from "react";

import ColButton from "../../buttons/ColButton";
import { IColDataModel } from "../../viewModelStore/ColDataModel";
import ColViewModel from "../../viewModelStore/ColViewModel";

export default ({
	cancel,
	reset,
	submit,
	viewModel,
}: {
	cancel?: <T extends IColDataModel>(item: T) => void,
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
				event.stopPropagation();
				viewModel.submit(submit);
			}}
		>
			<ColButton type="button"
				value="cancel"
				name="cancel"
				action={() => {
					viewModel.reset(cancel);
				}}
			/>
		</form>
	);
};
