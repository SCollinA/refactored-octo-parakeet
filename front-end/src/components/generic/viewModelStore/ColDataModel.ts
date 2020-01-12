export type IColDataModel = {
	[index in (string | number)]: any;
} & {
	id: string;
};
