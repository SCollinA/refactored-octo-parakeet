import { IImageFile } from "./file.model";

import { IColDataModel } from "../generic/viewModelStore/ColDataModel";

export interface IHoop extends IColDataModel {
	collections: string[];
	description: string;
	diameter: number;
	file?: IImageFile;
	image: string;
	price: number;
	title: string;
	recentlyupdatedimage: boolean;
	sold: boolean;
}
