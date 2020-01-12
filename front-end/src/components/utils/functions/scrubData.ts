import { omit } from "lodash/fp";

export function scrubData<T>(data: any): T {
	return omit(
		[
			"__typename",
		],
		data,
	);
}
