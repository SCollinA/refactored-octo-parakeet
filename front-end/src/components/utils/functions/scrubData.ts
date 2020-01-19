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

export function scrubData(data: IDataModel): IDataModel {
	const omittedData = omit<IDataModel, "__typename">([
			"__typename",
		], data);
	const setData = set<IDataModel>(
			"image",
			has("image", data) ?
				`${imagePrefix}${get("image", data) || ""}` :
				undefined,
			omittedData,
		);
	return setData;
}
