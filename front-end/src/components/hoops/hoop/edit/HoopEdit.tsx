import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React from "react";

import { DELETE_HOOP, UPDATE_HOOP } from "../../../../graphql/mutations";
import { GET_HOOPS_FULL } from "../../../../graphql/queries";
import { IHoop } from "../../../../models/hoop.model";

import ColLoading from "../../../generic/loading/ColLoading";
import ColForm from "../../../generic/model/edit/ColModel.edit";
import ColViewModel from "../../../generic/viewModelStore/ColViewModel";
import { imagePrefix } from "../../../utils/functions/isStringImage";
import { scrubData } from "../../../utils/functions/scrubData";
import { washData } from "../../../utils/functions/washData";

import "./HoopEdit.css";

export default ({
	cancel = () => undefined,
	hoopModel,
	remove = () => undefined,
	reset = () => undefined,
	submit = () => undefined,
}: {
	hoopModel: ColViewModel<IHoop>,
	cancel?: () => void,
	remove?: () => void,
	reset?: () => void,
	submit?: () => void,
}) => {
	const [
		updateHoop,
		{ loading: updateLoading },
	] = useMutation(UPDATE_HOOP, {
		variables: { id: hoopModel.id },
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
				({ id }: IHoop) => hoopModel.id !== id,
				cachedHoops,
			);
			cache.writeQuery({
				data: { Hoop: updatedHoops },
				query: GET_HOOPS_FULL,
			});
		},
		variables: { id: hoopModel.id },
	});
	const loading = updateLoading || removeLoading;
	return (
		<ColLoading text={"hallie's • hoops •"}
			loading={loading}
			fitChild={true}
			preventClick={false}
		>
			<ColForm viewModel={hoopModel}
				cancel={() => cancel()}
				remove={() => removeHoop()}
				reset={() => reset()}
				submit={() => {
					updateHoop({
						variables: washData(hoopModel.updatedDataModel),
					});
					submit();
				}}
			/>
		</ColLoading>
	);
};
