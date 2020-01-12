import { SyntheticEvent } from "react";

type ModelValue<T> = Exclude<T, object>;

export interface IViewModelValue<T> {
	onChange: (event: SyntheticEvent) => void;
	onReset: (event: SyntheticEvent) => void;
	onSubmit: (event: SyntheticEvent) => void;
	name: string;
	value: ModelValue<T>;
	type: ViewModelDataType;
}

export type ViewModelDataType =  "STRING" | "STRING_LONG" | "INTEGER" | "FLOAT" | "BOOLEAN" | "FILE";
