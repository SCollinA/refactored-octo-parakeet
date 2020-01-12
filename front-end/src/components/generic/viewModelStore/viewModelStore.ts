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

	public batchReset = () => {
		this.batchDataModels = mapValues(
			({ updatedDataModel }) => ({
				...updatedDataModel,
			}),
			this.viewModels,
		);
	}

	public batchSubmit = (onSubmit: () => void) => {
		forEach(
			(dataModel: T) => this.viewModels[dataModel.id] = new ViewModel(dataModel),
			this.batchDataModels,
		);
		this.batchDataModels = {};
		onSubmit();
	}

	public batchUpdate = (
		paths: Array<[string, ...Array<(keyof T)>]>,
	) => {
		return keyBy(
			"id",
			map(
				(path: [string, ...Array<(keyof T)>]) => ({
					id: path[0],
					update: (updates: Partial<T>) => {
						const updatedDataModel = {
							...this.batchDataModels[path[0]],
							...updates,
						};
						this.batchDataModels = set(path, updatedDataModel, this.batchDataModels);
					},
				}),
				paths,
			),
		);
	}

	public reset = (id: string, onReset: () => void): void => {
		const dataModel = get([id, "dataModel"], this.viewModels);
		this.viewModels = set([id, "updatedDataModel"], dataModel, this.viewModels);
		onReset();
	}

	public submit = (id: string, onSubmit: () => void): void => {
		const updatedDataModel = get([id, "updatedDataModel"], this.viewModels);
		this.viewModels = set([id, "dataModel"], updatedDataModel, this.viewModels);
		onSubmit();
	}

	public update = (
		id: string,
		updates: Partial<T>,
	): void => {
		const path = [id, "updatedDataModel"];
		let updatedDataModel = get(path, this.viewModels);
		updatedDataModel = {
			...updatedDataModel,
			updates,
		};
		this.viewModels = set(path, updatedDataModel, this.viewModels);
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
