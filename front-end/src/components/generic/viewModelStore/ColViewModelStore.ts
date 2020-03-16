// TODO: fix this class

// import { Dictionary } from "lodash";
// import { forEach, get, keyBy, map, mapValues, set } from "lodash/fp";

// import { IColDataModel } from "./ColDataModel";
// import ColViewModel from "./ColViewModel";

// export default class ColViewModelStore<T extends IColDataModel> {

// 	public batchDataModels: Dictionary<T> = {};
// 	public placeholders: T;
// 	public viewModels: Dictionary<ColViewModel<T>>;

// 	constructor(
// 		dataModels: T[],
// 		placeholders: T,
// 	) {
// 		this.placeholders = placeholders;
// 		this.viewModels = this.initializeViewModels(dataModels);
// 	}

// 	public batchReset = (onReset?: (dataModels: Dictionary<T>) => void) => {
// 		this.batchDataModels = mapValues(
// 			({ dataModel }) => ({
// 				...dataModel,
// 			}),
// 			this.viewModels,
// 		);
// 		if (!!onReset) {
// 			onReset(this.batchDataModels);
// 		}
// 	}

// 	public batchSubmit = (onSubmit?: (viewModels: Dictionary<ColViewModel<T>>) => void) => {
// 		forEach(
// 			(dataModel: T) => this.viewModels[dataModel.id] = new ColViewModel(dataModel, this.placeholders),
// 			this.batchDataModels,
// 		);
// 		this.batchDataModels = {};
// 		if (!!onSubmit) {
// 			onSubmit(this.viewModels);
// 		}
// 	}

// 	public batchUpdate = (
// 		paths: [string, ...(keyof T)[]][],
// 	) => {
// 		return keyBy(
// 			"id",
// 			map(
// 				(path: [string, ...(keyof T)[]]) => ({
// 					id: path[0],
// 					update: (updates: Partial<T>, onUpdate?: (dataModel: T) => void) => {
// 						const updatedDataModel = {
// 							...this.viewModels[path[0]].dataModel,
// 							...this.batchDataModels[path[0]],
// 							...updates,
// 						};
// 						this.batchDataModels = set(path, updatedDataModel, this.batchDataModels);
// 						if (!!onUpdate) {
// 							onUpdate(updatedDataModel);
// 						}
// 					},
// 				}),
// 				paths,
// 			),
// 		);
// 	}

// 	public reset = (id: string, onReset?: () => void): void => {
// 		const dataModel = get([id, "dataModel"], this.viewModels);
// 		this.viewModels = set([id, "updatedDataModel"], dataModel, this.viewModels);
// 		if (!!onReset) {
// 			onReset();
// 		}
// 	}

// 	public submit = (id: string, onSubmit?: () => void): void => {
// 		const updatedDataModel = get([id, "updatedDataModel"], this.viewModels);
// 		this.viewModels = set([id, "dataModel"], updatedDataModel, this.viewModels);
// 		if (!!onSubmit) {
// 			onSubmit();
// 		}
// 	}

// 	public update = (
// 		id: string,
// 		updates: Partial<T>,
// 		onUpdate: (dataModel: T) => void,
// 	): void => {
// 		const path = [id, "updatedDataModel"];
// 		const updatedDataModel = {
// 			...get(path, this.viewModels),
// 			updates,
// 		};
// 		this.viewModels = set(path, updatedDataModel, this.viewModels);
// 		if (!!onUpdate) {
// 			onUpdate(updatedDataModel);
// 		}
// 	}

// 	private initializeViewModels(dataModels: T[]): Dictionary<ColViewModel<T>> {
// 		return keyBy(
// 			"id",
// 			map(
// 				(dataModel) => {
// 					return new ColViewModel<T>(dataModel, this.placeholders);
// 				},
// 				dataModels,
// 			),
// 		);
// 	}
// }
