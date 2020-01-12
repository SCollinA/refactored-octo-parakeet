import { Dictionary } from "lodash";
import {
	cloneDeep,
	entries,
	flow,
	get,
	mapValues,
	omit,
	set,
} from "lodash/fp";

import {
	ColDataModelValue,
	IColDataModel,
} from "./ColDataModel";
import {
	ColViewModelDataType,
	ColViewModelValues,
} from "./ColViewModelValue";

type DataViews<T> = Array<ColViewModelValues<T>>;

export default class ColViewModel<T extends IColDataModel> {

	public dataModel: T;
	public dataViews: DataViews<T>;
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

	public remove = (onRemove?: (dataModel: T) => void) => {
		if (!!onRemove) {
			onRemove(this.dataModel);
		}
	}

	public reset = (onReset?: (dataModel: T) => void) => {
		this.updatedDataModel = this.dataModel;
		if (!!onReset) {
			onReset(this.updatedDataModel);
		}
	}

	public submit = (onSubmit?: (dataModel: T) => void) => {
		this.dataModel = cloneDeep(this.updatedDataModel);
		this.dataViews = this.getDataViews(this.dataModel);
		if (!!onSubmit) {
			onSubmit(this.dataModel);
		}
	}

	public update = (updates: Partial<T>, onUpdate?: (dataModel: T) => void) => {
		const updatedDataModel = {
			...this.updatedDataModel,
			...updates,
		};
		this.updatedDataModel = updatedDataModel;
		if (!!onUpdate) {
			onUpdate(this.updatedDataModel);
		}
	}

	private getDataType(key: keyof T, value: ColDataModelValue): ColViewModelDataType {
		if (!value) {
			value = this.placeholders[key];
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
				if (this.isStringImage(value)) {
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

	private getDataViews(dataModel: T): DataViews<T> {
		return flow(
			omit(["id"]),
			entries,
			mapValues(
				([key, value]): ColViewModelValues<T> => ({
					isValid: true, // TODO: implement validation
					key,
					type: this.getDataType(key, value),
				}),
			),
		)(dataModel);
	}

	private isStringImage(value: string): boolean {
		return value.startsWith("data:image/jpeg;base64,");
	}
}
