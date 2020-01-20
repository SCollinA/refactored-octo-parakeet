import React, { useState } from "react";

import ColButton from "../buttons/ColButton";
import ColCard from "../layout/card/ColCard";
import { IColDataModel } from "../viewModelStore/ColDataModel";
import ColViewModel from "../viewModelStore/ColViewModel";

import ColModelEdit from "./edit/ColModel.edit";
import ColModelRead from "./read-only/ColModel.read";

import "./ColModel.css";

export default ({
	cancel = () => undefined,
	dataModel,
	isEditable,
	isSelectable,
	isSelected,
	placeholders,
	remove = () => undefined,
	reset = () => undefined,
	select = () => undefined,
	submit = () => undefined,
	unselect = () => undefined,
}: {
	cancel?: () => void,
	dataModel: IColDataModel,
	isEditable?: boolean,
	isSelectable?: boolean,
	isSelected?: boolean,
	placeholders: IColDataModel,
	remove?: () => void,
	reset?: () => void,
	select?: () => void,
	submit?: (updatedModel: any) => void,
	unselect?: () => void,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const viewModel = new ColViewModel(dataModel, placeholders);
	console.log({viewModel})
	return (
		<div className="col-model"
			onClick={() => isSelectable && select()}
		>
			<ColCard clickable={!isSelected && isSelectable}>
				{isSelected && !isEditing &&
					<ColButton type="button"
						value="Back"
						action={() => unselect()}
					/>}
				{isEditable && !isEditing &&
					<ColButton type="button"
						value="edit"
						action={() => setIsEditing(true)}
					/>}
				{isEditable && isEditing ?
					<ColModelEdit viewModel={viewModel}
						cancel={() => {
							viewModel.reset(cancel);
							setIsEditing(false);
						}}
						remove={() => viewModel.remove(remove)}
						reset={() => viewModel.reset(reset)}
						submit={() => {
							submit(viewModel.updatedDataModel);
							viewModel.submit();
							setIsEditing(false);
						}}
						update={(value: Partial<IColDataModel>) => {
							console.log("col model top update", value);
							viewModel.update(value);
						}}
					/> :
					<ColModelRead viewModel={viewModel}/>}
			</ColCard>
		</div>
	);
};
