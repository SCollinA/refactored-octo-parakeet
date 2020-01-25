import { IImageFile } from "../../../models/file.model";

export type ColDataModelSingle =
	string |
	number |
	boolean |
	IImageFile;

export type ColDataModelValue =
	ColDataModelSingle |
	ColDataModelSingle[];

export interface IColDataModel {
	id: string;
	[index: string]:
		ColDataModelValue | undefined;
}
