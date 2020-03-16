import {
	entries, flow, get, isNull, isUndefined, map, omit, reduce, set, pick,
} from "lodash/fp";
import React, { useState } from "react";

import isStringImage from "../../utils/functions/isStringImage";

import ColButton from "../buttons/ColButton";
import ColCard from "../layout/card/ColCard";
import { ColDataModelValue, IColDataModel } from "../viewModelStore/ColDataModel";
import { DataViews } from "../viewModelStore/ColViewModelValue";
import { ColViewModelDataType, ColViewModelValues } from "../viewModelStore/ColViewModelValue";

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
	unselectedKeys,
	onRemove = () => undefined,
	onReset = () => undefined,
	select = () => undefined,
	onSubmit = () => undefined,
	unselect = () => undefined,
}: {
	cancel?: () => void,
	dataModel: IColDataModel,
	isEditable?: boolean,
	isSelectable?: boolean,
	isSelected?: boolean,
	placeholders: IColDataModel,
	unselectedKeys?: (keyof IColDataModel)[] | ["id"],
	onRemove?: () => void,
	onReset?: () => void,
	select?: () => void,
	onSubmit?: (updatedModel: any) => void,
	unselect?: () => void,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	if (!!unselectedKeys && !isSelected) {
		dataModel = pick(unselectedKeys, dataModel) as IColDataModel;
	}
	const initialState = {
		dataViews: getDataViews(dataModel, placeholders),
		updatedDataModel: dataModel,
	};
	const [viewModel, setViewModel] = useState(initialState);
	const remove = (callback?: () => void) => {
		if (!!callback) {
			callback();
		}
	};
	const reset = (callback?: () => void) => {
		const dataViews = getDataViews(dataModel, placeholders);
		setViewModel({
			dataViews,
			updatedDataModel: dataModel,
		});
		if (!!callback) {
			callback();
		}
	};
	const submit = (callback?: (updatedDataModel: IColDataModel) => void) => {
		const dataViews = getDataViews(viewModel.updatedDataModel, placeholders);
		setViewModel({
			...viewModel,
			dataViews,
		});
		if (!!callback) {
			callback(viewModel.updatedDataModel);
		}
	};
	const update = (updates: Partial<IColDataModel>, callback?: () => void) => {
		const updatedDataModel = {
			...viewModel.updatedDataModel,
			...updates,
		};
		const dataViews = getDataViews(updatedDataModel, placeholders);
		setViewModel({
			dataViews,
			updatedDataModel,
		});
		if (!!callback) {
			callback();
		}
	};
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
					<ColModelEdit dataViews={viewModel.dataViews}
						cancel={() => {
							reset(cancel);
							setIsEditing(false);
						}}
						remove={() => remove(onRemove)}
						reset={() => reset(onReset)}
						submit={() => {
							submit(onSubmit);
							setIsEditing(false);
						}}
						update={(value: Partial<IColDataModel>) => {
							update(value);
						}}
					/> :
					<ColModelRead dataViews={viewModel.dataViews}/>}
			</ColCard>
		</div>
	);
};

const getDataType =
	(key: string, value: ColDataModelValue, placeholders: IColDataModel): ColViewModelDataType => {
		const placeholder = placeholders[key];
		if (!value && !isNull(placeholder) && !isUndefined(placeholder)) {
			value = placeholder;
		}
		switch (typeof value) {
			case "boolean":
				return "BOOLEAN";
		case "number":
				if (value % 1 === 0) {
					return "INTEGER";
				} else {
					return "FLOAT";
				}
			case "string":
				if (isStringImage(value)) {
					return "IMAGE";
				} else if (get(["length"], value) < 20) {
					return "STRING";
				} else {
					return "STRING_LONG";
				}
			default:
				return "STRING";
		}
	};

export const getDataViews = (dataModel: IColDataModel, placeholders: IColDataModel): DataViews => {
	const newDataViews: DataViews = {};
	return flow(
		omit(["id"]),
		entries,
		map(([key, value]): ColViewModelValues => {
				const dataType = getDataType(key, value, placeholders);
				let dataView: ColViewModelValues;
				switch (dataType) {
					case "BOOLEAN":
						dataView = {
							isValid: true, // TODO: implement validation
							key,
							placeholder: false,
							type: dataType,
							value,
						};
						break;
					case "INTEGER":
						dataView = {
							isValid: true, // TODO: implement validation
							key,
							placeholder: 0,
							type: dataType,
							value,
						};
						break;
					case "FLOAT":
						dataView = {
							isValid: true, // TODO: implement validation
							key,
							placeholder: 0.0,
							type: dataType,
							value,
						};
						break;
					case "STRING":
						dataView = {
							isValid: true, // TODO: implement validation
							key,
							placeholder: "",
							type: dataType,
							value,
						};
						break;
					case "STRING_LONG":
						dataView = {
							isValid: true, // TODO: implement validation
							key,
							placeholder: "",
							type: dataType,
							value,
						};
						break;
					case "IMAGE":
						dataView = {
							isValid: true, // TODO: implement validation
							key,
							placeholder: "data:image/jpeg;base64,",
							type: dataType,
							value,
						};
						break;
				}
				return dataView;
			},
		),
		reduce(
			(acc, dataView) => set(dataView.key, dataView, acc),
			newDataViews,
		),
	)(dataModel);
};
