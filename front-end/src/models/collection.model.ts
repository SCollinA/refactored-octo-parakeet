import { IHoop } from "./hoop.model";

export interface ICollection {
	id: string;
	hoops: IHoop[];
	name: string;
}
