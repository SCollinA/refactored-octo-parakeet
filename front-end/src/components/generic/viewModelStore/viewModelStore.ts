import { Dictionary } from "lodash";
import { forEach, get, keyBy, map, mapValues, set } from "lodash/fp";

import { IDataModel } from "./dataModel";
import ViewModel from "./viewModel";

export default class ViewModelStore<T extends IDataModel> {

	public batchDataModels: Dictionary<T> = {};
	public viewModels: Dictionary<ViewModel<T>>;

	constructor(
		dataModels: T[],
	) {
		this.viewModels = this.initializeViewModels(dataModels);
	}

	public batchReset = (onReset?: (dataModels: Dictionary<T>) => void) => {
		this.batchDataModels = mapValues(
			({ dataModel }) => ({
				...dataModel,
			}),
			this.viewModels,
		);
		if (!!onReset) {
			onReset(this.batchDataModels);
		}
	}

	public batchSubmit = (onSubmit?: (viewModels: Dictionary<ViewModel<T>>) => void) => {
		forEach(
			(dataModel: T) => this.viewModels[dataModel.id] = new ViewModel(dataModel),
			this.batchDataModels,
		);
		this.batchDataModels = {};
		if (!!onSubmit) {
			onSubmit(this.viewModels);
		}
	}

	public batchUpdate = (
		paths: Array<[string, ...Array<(keyof T)>]>,
	) => {
		return keyBy(
			"id",
			map(
				(path: [string, ...Array<(keyof T)>]) => ({
					id: path[0],
					update: (updates: Partial<T>, onUpdate?: (dataModel: T) => void) => {
						const updatedDataModel = {
							...this.viewModels[path[0]].dataModel,
							...this.batchDataModels[path[0]],
							...updates,
						};
						this.batchDataModels = set(path, updatedDataModel, this.batchDataModels);
						if (!!onUpdate) {
							onUpdate(updatedDataModel);
						}
					},
				}),
				paths,
			),
		);
	}

	public reset = (id: string, onReset?: () => void): void => {
		const dataModel = get([id, "dataModel"], this.viewModels);
		this.viewModels = set([id, "updatedDataModel"], dataModel, this.viewModels);
		if (!!onReset) {
			onReset();
		}
	}

	public submit = (id: string, onSubmit?: () => void): void => {
		const updatedDataModel = get([id, "updatedDataModel"], this.viewModels);
		this.viewModels = set([id, "dataModel"], updatedDataModel, this.viewModels);
		if (!!onSubmit) {
			onSubmit();
		}
	}

	public update = (
		id: string,
		updates: Partial<T>,
		onUpdate: (dataModel: T) => void,
	): void => {
		const path = [id, "updatedDataModel"];
		const updatedDataModel = {
			...get(path, this.viewModels),
			updates,
		};
		this.viewModels = set(path, updatedDataModel, this.viewModels);
		if (!!onUpdate) {
			onUpdate(updatedDataModel);
		}
	}

	private initializeViewModels(dataModels: T[]): Dictionary<ViewModel<T>> {
		return keyBy(
			"id",
			map(
				(dataModel) => {
					return new ViewModel<T>(dataModel);
				},
				dataModels,
			),
		);
	}
}
