import { ICollection } from "./collection.model";
import { IImageFile } from "./file.model";

import { IColDataModel } from "../components/generic/viewModelStore/ColDataModel";

export interface IHoop extends IColDataModel {
	id: string;
	title: string;
	collections: ICollection[];
	description: string;
	file?: IImageFile;
	image: string;
	recentlyupdatedimage: boolean;
	diameter: number;
	price: number;
	sold: boolean;
}
