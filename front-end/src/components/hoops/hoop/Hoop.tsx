import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React, { useContext } from "react";

import { DELETE_HOOP, UPDATE_HOOP } from "../../../graphql/mutations";
import { GET_HOOPS_FULL } from "../../../graphql/queries";
import { IHoop } from "../../../models/hoop.model";
import ColPlaceholder from "../../../components-collin/layout/placeholder/ColPlaceholder";
import ColModel from "../../../components-collin/model/ColModel";
import { imagePrefix } from "../../../components-collin/utils/image.utils";

import { AdminContext } from "../../admin/AdminContext";
import { CollectionContext } from "../../collections/CollectionContext";
import Loading from "../../loading/Loading";
import { scrubData } from "../../utils/functions/scrubData";
import { washData } from "../../utils/functions/washData";

import "./Hoop.scss";

export default ({
	hoop,
}: {
	hoop?: IHoop,
}) => {
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedHoopId,
		setSelectedHoopId,
	} = useContext(CollectionContext);
	const isSelected = selectedHoopId === get("id", hoop);
	const selectedClass = isSelected ? " hoop--selected" : "";
	if (!hoop) {
		return <ColPlaceholder/>;
	} else {
		const scrubbedHoop = scrubData<IHoop>(hoop);
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
		return (
			<div className={`hoop${selectedClass}`}>
				<Loading loading={loading}>
					<ColModel dataModel={scrubbedHoop}
						isSelectable={true}
						isSelected={isSelected}
						unselectedKeys={["id", "title", "image"]}
						placeholders={{
							...placeholders,
							id: hoop.id,
						}}
						select={() => setSelectedHoopId(hoop.id)}
						unselect={() => setSelectedHoopId("")}
						isEditable={isLoggedIn && isSelected}
						onRemove={() => {
							removeHoop();
							setSelectedHoopId("");
						}}
						onSubmit={(updatedHoop: IHoop) => updateHoop({
							variables: washData(updatedHoop),
						})}
					/>
				</Loading>
			</div>
		);
	}
};

const placeholders: IHoop = {
	collections: [],
	description: "",
	diameter: 0,
	file: undefined,
	id: "",
	image: `${imagePrefix}`,
	price: 0,
	recentlyupdatedimage: false,
	sold: false,
	title: "",
};
