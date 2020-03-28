import {
	flow,
	get,
	isArray,
	omit,
	set,
} from "lodash/fp";

import {
	reduce,
} from "lodash";

import { IDataModel } from "../../../models/models";

import { imagePrefix } from "../../../components-collin/utils/image.utils";

export function scrubData<T extends IDataModel>(data: T): any {
	return flow(
		omit([
			"__typename",
		]),
		(dirtyImageData) => !!get("image", data) ?
			set(
				"image",
				`${imagePrefix}${get("image", data)}`,
				dirtyImageData,
			) :
			dirtyImageData,
		(dirtyJoinedData) => reduce(
			dirtyJoinedData,
			(acc, curr, key) => {
				if (!isArray(curr)) {
					acc = set(key, curr, acc);
				}
				return acc;
			},
			{ id: data.id },
		),
	)(data)
}
