import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React from "react";

import { DELETE_HOOP, UPDATE_HOOP } from "../../../../graphql/mutations";
import { GET_HOOPS_FULL } from "../../../../graphql/queries";
import { IHoop } from "../../../../models/hoop.model";

import ColForm from "../../../generic/inputs/form/ColForm";
import ColLoading from "../../../generic/loading/ColLoading";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";
import { imagePrefix } from "../../../utils/functions/isStringImage";
import { scrubData } from "../../../utils/functions/scrubData";

import "./HoopEdit.css";

export default ({
	cancel = () => undefined,
	hoop,
	reset = () => undefined,
	submit = () => undefined,
}: {
	hoop: IHoop,
	cancel?: () => void,
	reset?: () => void,
	submit?: () => void,
}) => {
	const [
		updateHoop,
		{ loading: updateLoading },
	] = useMutation(UPDATE_HOOP, {
		variables: { id: hoop.id },
	});
	const [
		removeHoop,
		{ loading: removeLoading },
	] = useMutation(DELETE_HOOP, {
		update(cache) {
			const cachedData = cache.readQuery({
				query: GET_HOOPS_FULL,
			});
			const cachedHoops = get(
				"Collection",
				cachedData,
			);
			const updatedHoops = filter(
				({ id }: IHoop) => hoop.id !== id,
				cachedHoops,
			);
			cache.writeQuery({
				data: { Hoop: updatedHoops },
				query: GET_HOOPS_FULL,
			});
		},
		variables: { id: hoop.id },
	});
	const loading = updateLoading || removeLoading;
	const scrubbedHoop = scrubData<IHoop>(hoop);
	const placeholders = washCollection(scrubbedHoop);
	const viewModel = new ColViewModel(scrubbedHoop, placeholders);
	return (
		<ColLoading text={"hallie's • hoops •"}
			loading={loading}
			fitChild={true}
			preventClick={false}
		>
			<ColForm viewModel={viewModel}
				cancel={() => cancel()}
				remove={() => removeHoop()}
				reset={() => reset()}
				submit={() => {
					updateHoop({
						variables: {
							...viewModel.updatedDataModel,
						},
					});
					submit();
				}}
			/>
		</ColLoading>
	);
};

const washCollection = (hoop: IHoop): IHoop => {
	return {
		collections: hoop.collections || [],
		description: hoop.description || "",
		diameter: hoop.diameter || 0,
		file: hoop.file || undefined,
		id: hoop.id,
		image: hoop.image || imagePrefix,
		price: hoop.price || 0,
		recentlyupdatedimage:
			hoop.recentlyupdatedimage || false,
		sold: hoop.sold || false,
		title: hoop.title || "",
	};
};
