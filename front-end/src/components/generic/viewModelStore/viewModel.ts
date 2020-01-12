import { Dictionary } from "lodash";
import { cloneDeep, get, mapKeys, mapValues, set } from "lodash/fp";

import { IDataModel } from "./dataModel";
import { IViewModelValue, ViewModelDataType } from "./viewModelValue";

type DataViews<T> = Dictionary<IViewModelValue<T>>;

export default class ViewModel<T extends IDataModel> {

	public dataModel: T;
	public dataViews: DataViews<T>;
	public updatedDataModel: T;

	constructor(
		dataModel: T,
	) {
		this.dataModel = dataModel;
		this.dataViews = this.getDataViews(dataModel);
		this.updatedDataModel = cloneDeep(dataModel);
	}

	public reset = (onReset?: (dataModel: T) => void) => {
		this.updatedDataModel = get([], this.dataModel);
		if (!!onReset) {
			onReset(this.updatedDataModel);
		}
	}

	public submit = (onSubmit?: (dataModel: T) => void) => {
		this.dataModel = set([], this.updatedDataModel, this.dataModel);
		this.dataViews = this.getDataViews(this.dataModel);
		if (!!onSubmit) {
			onSubmit(this.dataModel);
		}
	}

	public update = (updates: Partial<T>, onUpdate?: (dataModel: T) => void) => {
		const updatedDataModel = {
			...get([], this.updatedDataModel),
			...updates,
		};
		this.dataModel = set([], updatedDataModel, this.dataModel);
		this.dataViews = this.getDataViews(this.dataModel);
		if (!!onUpdate) {
			onUpdate(this.dataModel);
		}
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
		return mapValues(
			(value): IViewModelValue<T> => ({
				isValid: true, // TODO: implement validation
				onChange: () => null, // TODO: implement auto onChange methods
				onReset: () => null, // TODO: implement auto onChange methods
				onSubmit: () => null, // TODO: implement auto onChange methods
				type: this.getDataType(value),
				value,
			}),
			dataModel,
		);
	}

	private isStringImage(value: string): boolean {
		return value.startsWith("data:image/jpeg;base64,");
	}
}
