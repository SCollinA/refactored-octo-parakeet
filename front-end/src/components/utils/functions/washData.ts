import {
	flow,
	get,
	replace,
	set,
} from "lodash/fp";
import { IDataModel } from "../../../models/models";
import { imagePrefix } from "../../../components-collin/utils/image.utils";

export function washData(data: IDataModel): IDataModel {
	return flow(
		set("image", replace(imagePrefix, "", get("image", data) as string || "")),
	)(data);
}
