import {
	flow,
	get,
	replace,
} from "lodash/fp";

export const imagePrefix = "data:image/jpeg;base64,";

export default (value: string): boolean => {
	return value.startsWith(imagePrefix);
};

export const isImageEmpty = (value: string): boolean =>
	!flow(
		replace(imagePrefix, ""),
		get("length"),
	)(value);
