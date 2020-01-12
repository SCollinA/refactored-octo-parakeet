import { IImageFile } from "../../../models/file.model";

export type ColDataModelValue = string | number | boolean | IImageFile | undefined;

export interface IColDataModel {
	id: string;
	[index: string]: ColDataModelValue;
}