import { SyntheticEvent } from "react";

type ModelValue<T> = Exclude<T, object>;

export interface IViewModelValue<T> {
	isRequired?: boolean;
	isValid: boolean;
	onChange: (event: SyntheticEvent) => void;
	onReset: (event: SyntheticEvent) => void;
	onSubmit: (event: SyntheticEvent) => void;
	type: ViewModelDataType;
	value: ModelValue<T>;
}

export type ViewModelDataType =  "STRING" | "STRING_LONG" | "IMAGE" | "INTEGER" | "FLOAT" | "BOOLEAN" | "FILE";
