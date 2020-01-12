import { IColDataModel } from "../components/generic/viewModelStore/ColDataModel";

export interface ICollection extends IColDataModel {
	id: string;
	name: string;
}
