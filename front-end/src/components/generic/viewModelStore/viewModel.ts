import { Dictionary } from "lodash";
import { cloneDeep, get, mapValues } from "lodash/fp";

import { IDataModel } from "./dataModel";
import { ViewModelDataType } from "./viewModelValue";

export default class ViewModel<T extends IDataModel> {

	public dataModel: T;
	public dataViews: Dictionary<ViewModelDataType>;
	public updatedDataModel: T;

	constructor(
		dataModel: T,
	) {
		this.dataModel = dataModel;
		this.dataViews = this.getDataViews(dataModel);
		this.updatedDataModel = cloneDeep(dataModel);
	}

	private getDataType(value: T[keyof T]): ViewModelDataType {
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
				if (get(["length"], value) < 140) {
					return "STRING";
				} else {
					return "STRING_LONG";
				}
			default:
				return "FILE";
		}
	}

	private getDataViews(dataModel: T): Dictionary<ViewModelDataType> {
		return mapValues(
			(value) => this.getDataType(value),
			dataModel,
		);
	}
}
