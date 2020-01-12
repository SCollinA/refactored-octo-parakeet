import { SyntheticEvent } from "react";

type ModelValue<T> = Exclude<T, object>;

export interface IColViewModelValue<T> {
	isRequired?: boolean;
	isValid: boolean;
	onChange: (event: SyntheticEvent) => void;
	onReset: (event: SyntheticEvent) => void;
	onSubmit: (event: SyntheticEvent) => void;
	type: ColViewModelDataType;
	value: ModelValue<T>;
}

export type ColViewModelDataType =  "STRING" | "STRING_LONG" | "IMAGE" | "INTEGER" | "FLOAT" | "BOOLEAN" | "FILE";
