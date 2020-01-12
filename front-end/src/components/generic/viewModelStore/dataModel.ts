export type IDataModel = {
	[index in (string | number)]: any;
} & {
	id: string;
};
