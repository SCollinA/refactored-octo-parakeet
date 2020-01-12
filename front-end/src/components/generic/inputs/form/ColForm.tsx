import React, { SyntheticEvent } from "react";

import ColViewModel from "../../viewModelStore/ColViewModel";

import { ICollection } from "../../../../models/collection.model";
import { IHoop } from "../../../../models/hoop.model";
import { IColDataModel } from "../../viewModelStore/ColDataModel";

export default ({
	reset,
	submit,
	viewModel,
}: {
	reset?: <T extends IColDataModel>(item: T) => void,
	submit?: <T extends IColDataModel>(item: T) => void,
	viewModel: ColViewModel<IHoop | ICollection>,
}) => {
	return (
		<form id="col-form"
			onSubmit={(event: SyntheticEvent) => {
				event.stopPropagation();
				viewModel.submit();
				if (!!submit) {
					submit(viewModel.dataModel);
				}
			}}
			onReset={() => {
				viewModel.reset();
				if (!!reset) {
					reset(viewModel.dataModel);
				}
			}}
		>
			
		</form>
	);
};
