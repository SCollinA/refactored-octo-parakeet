import React, { SyntheticEvent } from "react";

import ColButton from "../../buttons/ColButton";
import { IColDataModel } from "../../viewModelStore/ColDataModel";
import ColViewModel from "../../viewModelStore/ColViewModel";

import { ICollection } from "../../../../models/collection.model";
import { IHoop } from "../../../../models/hoop.model";

export default ({
	cancel,
	reset,
	submit,
	viewModel,
}: {
	cancel?: <T extends IColDataModel>(item: T) => void,
	reset?: <T extends IColDataModel>(item: T) => void,
	submit?: <T extends IColDataModel>(item: T) => void,
	viewModel: ColViewModel<IHoop | ICollection>,
}) => {
	return (
		<form id="col-form"
			onReset={() => {
				viewModel.reset();
				if (!!reset) {
					reset(viewModel.dataModel);
				}
			}}
			onSubmit={(event: SyntheticEvent) => {
				event.stopPropagation();
				viewModel.submit();
				if (!!submit) {
					submit(viewModel.dataModel);
				}
			}}
		>
			<ColButton type="button"
				value="cancel"
				name="cancel"
				action={() => {
					viewModel.reset();
					if (!!cancel) {
						cancel(viewModel.dataModel);
					}
				}}
			/>
		</form>
	);
};
