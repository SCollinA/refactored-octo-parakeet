import React, { SyntheticEvent } from "react";

import ViewModel from "../../viewModelStore/viewModel";

import { ICollection } from "../../../../models/collection.model";
import { IHoop } from "../../../../models/hoop.model";

export default ({
	viewModel,
}: {
	viewModel: ViewModel<IHoop | ICollection>,
}) => {
	return (
		<form id="UpdateGalleryForm"
			onSubmit={(event: SyntheticEvent) => {
				event.stopPropagation();
				viewModel.submit();
			}}
			onReset={() => viewModel.reset()}
		>
			
		</form>
	);
};
