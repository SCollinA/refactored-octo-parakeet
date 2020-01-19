import {
	flow,
	get,
	replace,
	set,
} from "lodash/fp";
import { IDataModel } from "../../../models/models";
import { imagePrefix } from "./isStringImage";

export function washData(data: IDataModel): IDataModel {
	const newData = flow(
		set("image", replace(imagePrefix, "", get("image", data) as string || "")),
	)(data);
	return newData;
}
