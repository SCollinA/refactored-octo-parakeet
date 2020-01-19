import { ColDataModelSingle } from "./ColDataModel";

export type ColViewModelDataType =
	"STRING" |
	"STRING_LONG" |
	"IMAGE" |
	"INTEGER" |
	"FLOAT" |
	"BOOLEAN"; // |
	// "FILE";

interface IColViewModelValue {
	key: string;
	isRequired?: boolean;
	isValid: boolean;
	type: ColViewModelDataType;
	// value: ColDataModelSingle;
	placeholder: ColDataModelSingle;
}

export type ColViewModelValues =
	ColViewModelValueBoolean |
	// ColViewModelValueFile |
	ColViewModelValueFloat |
	ColViewModelValueImage |
	ColViewModelValueInteger |
	ColViewModelValueString |
	ColViewModelValueStringLong;

export type ColViewModelValueString = IColViewModelValue & {
	type: "STRING";
	value: string;
	placeholder?: "";
};

export type ColViewModelValueStringLong = IColViewModelValue & {
	type: "STRING_LONG";
	value: string;
	placeholder?: "";
};

export type ColViewModelValueImage = IColViewModelValue & {
	type: "IMAGE";
	value: string;
	placeholder?: "data:image/jpeg;base64,";
};

export type ColViewModelValueInteger = IColViewModelValue & {
	type: "INTEGER";
	value: number;
	placeholder?: 0;
};

export type ColViewModelValueFloat = IColViewModelValue & {
	type: "FLOAT";
	value: number;
	placeholder?: 0.0;
};

export type ColViewModelValueBoolean = IColViewModelValue & {
	type: "BOOLEAN";
	value: boolean;
	placeholder?: false;
};

// export type ColViewModelValueFile = IColViewModelValue & {
// 	type: "FILE";
// 	value?: any;
// 	placeholder?: {};
// };
