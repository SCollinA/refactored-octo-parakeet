import { ICollection } from "./collection.model";
import { IImageFile } from "./file.model";

export interface IHoop {
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
