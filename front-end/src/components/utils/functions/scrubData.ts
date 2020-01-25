import {
	cloneDeep,
	get,
	has,
	isArray,
	omit,
	set,
} from "lodash/fp";

import {
	reduce,
} from "lodash";

import { IDataModel } from "../../../models/models";

import { imagePrefix } from "./isStringImage";

export function scrubData<T extends IDataModel>(data: T): any {
	const omittedData = omit([
			"__typename",
		], data);
	const setData = has("image", data) ?
		set(
			"image",
			`${imagePrefix}${get("image", data) || ""}`,
			omittedData,
		) :
		omittedData;
	const dataWithoutArrays = reduce(
		setData,
		(acc, curr, key) => {
			if (!isArray(curr)) {
				acc = set(key, curr, acc);
			}
			return acc;
		},
		{ id: data.id },
	);
	return dataWithoutArrays;
}
