import {
	flow,
	get,
	has,
	map,
	omit,
	set,
} from "lodash/fp";
import { IDataModel } from "../../../models/models";
import { imagePrefix } from "./isStringImage";

export function scrubData<T extends IDataModel>(data: T): T {
	const omittedData = omit<T, "__typename">([
			"__typename",
		], data);
	const setData = set<T>(
			"image",
			has("image", data) ?
				`${imagePrefix}${get("image", data) || ""}` :
				undefined,
			omittedData,
		);
	return setData;
}
