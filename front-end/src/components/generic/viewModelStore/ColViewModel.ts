import { Dictionary } from "lodash";
import {
	cloneDeep,
	entries,
	flow,
	get,
	isNull,
	isUndefined,
	map,
	omit,
	reduce,
	set,
} from "lodash/fp";
import {
	BehaviorSubject,
} from "rxjs";

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

	public id: string;
	public get dataModel() {
		return this._dataModel.asObservable();
	}
	public get dataViews() {
		return this._dataViews.asObservable();
	}
	public get updatedDataModel() {
		return this._updatedDataModel.asObservable();
	}

	private _dataModel: BehaviorSubject<T>;
	private _dataViews: BehaviorSubject<DataViews>;
	private _updatedDataModel: BehaviorSubject<T>;
	private placeholders: T;

	constructor(
		dataModel: T,
		placeholders: T,
	) {
		this.id = dataModel.id;
		this.placeholders = placeholders;
		this._dataModel = new BehaviorSubject(dataModel);
		this._dataViews = new BehaviorSubject(this.getDataViews(dataModel));
		this._updatedDataModel = new BehaviorSubject(cloneDeep(dataModel));
	}

	public remove = (onRemove?: (viewModel: ColViewModel<T>) => void) => {
		if (!!onRemove) {
			onRemove(this);
		}
	}

	public reset = (onReset?: (viewModel: ColViewModel<T>) => void) => {
		this._updatedDataModel.next(cloneDeep(this._dataModel.getValue()));
		this._dataViews.next(this.getDataViews(this._updatedDataModel.getValue()));
		if (!!onReset) {
			console.log(
				"resetting data model",
				this._dataModel.getValue(),
				this._updatedDataModel.getValue(),
				this._dataViews.getValue(),
			);
			onReset(this);
		}
	}

	public submit = (onSubmit?: (viewModel: ColViewModel<T>) => void) => {
		this._dataModel.next(cloneDeep(this._updatedDataModel.getValue()));
		this._dataViews.next(this.getDataViews(this._dataModel.getValue()));
		if (!!onSubmit) {
			onSubmit(this);
		}
	}

	public update = (updates: Partial<T>, onUpdate?: (viewModel: ColViewModel<T>) => void) => {
		const updatedDataModel = {
			...cloneDeep(this._updatedDataModel.getValue()),
			...updates,
		};
		this._updatedDataModel.next(updatedDataModel);
		this._dataViews.next(this.getDataViews(updatedDataModel));
		console.log("view model update", this._updatedDataModel.getValue(), this._dataViews.getValue());
		if (!!onUpdate) {
			onUpdate(this);
		}
	}

	private getDataType(key: string, value: ColDataModelValue): ColViewModelDataType {
		const placeholder = this.placeholders[key];
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

	}

	private getDataViews(dataModel: T): DataViews {
		const newDataViews: DataViews = {};
		return flow(
			omit(["id"]),
			entries,
			map(([key, value]): ColViewModelValues => {
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
					}
					return dataView;
				},
			),
			reduce(
				(acc, dataView) => set(dataView.key, dataView, acc),
				newDataViews,
			),
		)(dataModel);
	}
}
