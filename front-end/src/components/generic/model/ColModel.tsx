import React from "react";

import { IColDataModel } from "../viewModelStore/ColDataModel";
import ColViewModel from "../viewModelStore/ColViewModel";

import ColModelEdit from "./edit/ColModel.edit";
import ColModelRead from "./read-only/ColModel.read";

import "./ColModel.css";

export default ({
	cancel = () => undefined,
	isEditing,
	remove = () => undefined,
	reset = () => undefined,
	submit = () => undefined,
	viewModel,
}: {
	cancel?: () => void,
	isEditing: boolean,
	remove?: () => void,
	reset?: () => void,
	submit?: () => void,
	viewModel: ColViewModel<IColDataModel>,
}) => isEditing ?
	<ColModelEdit viewModel={viewModel}
		cancel={() => cancel()}
		remove={() => remove()}
		reset={() => reset()}
		submit={() => submit()}
	/> :
	<ColModelRead viewModel={viewModel}/>;
