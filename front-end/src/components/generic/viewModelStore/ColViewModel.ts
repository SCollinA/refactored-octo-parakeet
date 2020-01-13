import { Dictionary } from "lodash";
import {
	cloneDeep,
	entries,
	flow,
	get,
	mapValues,
	omit,
} from "lodash/fp";

import isStringImage from "../../utils/functions/isStringImage";

import {
	ColDataModelValue,
	IColDataModel,
} from "./ColDataModel";
import {
	ColViewModelDataType,
	ColViewModelValues,
} from "./ColViewModelValue";

export type DataViews = Dictionary<ColViewModelValues>;

export default class ColViewModel<T extends IColDataModel> {

	public dataModel: T;
	public dataViews: DataViews;
	public placeholders: T;
	public updatedDataModel: T;

	constructor(
		dataModel: T,
		placeholders: T,
	) {
		this.dataModel = dataModel;
		this.placeholders = placeholders;
		this.dataViews = this.getDataViews(dataModel);
		this.updatedDataModel = cloneDeep(dataModel);
	}

	public remove = (onRemove?: (viewModel:  ColViewModel<T>) => void) => {
		if (!!onRemove) {
			onRemove(this);
		}
	}

	public reset = (onReset?: (viewModel: ColViewModel<T>) => void) => {
		this.updatedDataModel = this.dataModel;
		if (!!onReset) {
			onReset(this);
		}
	}

	public submit = (onSubmit?: (viewModel:  ColViewModel<T>) => void) => {
		this.dataModel = cloneDeep(this.updatedDataModel);
		this.dataViews = this.getDataViews(this.dataModel);
		if (!!onSubmit) {
			onSubmit(this);
		}
	}

	public update = (updates: Partial<T>, onUpdate?: (viewModel: ColViewModel<T>) => void) => {
		const updatedDataModel = {
			...cloneDeep(this.updatedDataModel),
			...updates,
		};
		this.updatedDataModel = updatedDataModel;
		console.log("making updates", this.updatedDataModel);
		this.dataViews = this.getDataViews(this.updatedDataModel);
		if (!!onUpdate) {
			onUpdate(this);
		}
	}

	private getDataType(key: string, value: ColDataModelValue): ColViewModelDataType {
		const placeholder = this.placeholders[key];
		if (!value && !!placeholder) {
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
				} else if (get(["length"], value) < 140) {
					return "STRING";
				} else {
					return "STRING_LONG";
				}
			default:
				return "FILE";
		}

	}

	private getDataViews(dataModel: T): DataViews {
		return flow(
			omit(["id"]),
			entries,
			mapValues(
				([key, value]): ColViewModelValues => {
					const dataType = this.getDataType(key, value);
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
						case "FILE":
							dataView = {
								isValid: true, // TODO: implement validation
								key,
								placeholder: "",
								type: dataType,
								value,
							};
							break;
					}
					return dataView;
				},
			),
		)(dataModel);
	}
}
