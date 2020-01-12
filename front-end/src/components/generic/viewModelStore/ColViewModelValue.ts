import { SyntheticEvent } from "react";

export type ColViewModelDataType =  "STRING" | "STRING_LONG" | "IMAGE" | "INTEGER" | "FLOAT" | "BOOLEAN" | "FILE";

interface IColViewModelValue {
	isRequired?: boolean;
	isValid: boolean;
	onChange: (event: SyntheticEvent) => void;
	onReset: (event: SyntheticEvent) => void;
	onSubmit: (event: SyntheticEvent) => void;
	type: ColViewModelDataType;
}

export type ColViewModelValues<T> = IColViewModelValueBoolean<T> |
	IColViewModelValueFile<T> |
	IColViewModelValueFloat<T> |
	IColViewModelValueImage<T> |
	IColViewModelValueInteger<T> |
	IColViewModelValueString<T> |
	IColViewModelValueStringLong<T>;

export interface IColViewModelValueString<T> extends IColViewModelValue {
	type: "STRING";
}

export interface IColViewModelValueStringLong<T> extends IColViewModelValue {
	type: "STRING_LONG";
}

export interface IColViewModelValueImage<T> extends IColViewModelValue {
	type: "IMAGE";
}

export interface IColViewModelValueInteger<T> extends IColViewModelValue {
	type: "INTEGER";
}

export interface IColViewModelValueFloat<T> extends IColViewModelValue {
	type: "FLOAT";
}

export interface IColViewModelValueBoolean<T> extends IColViewModelValue {
	type: "BOOLEAN";
}

export interface IColViewModelValueFile<T> extends IColViewModelValue {
	type: "FILE";
}
