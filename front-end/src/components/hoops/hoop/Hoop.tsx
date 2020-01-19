import { useMutation } from "@apollo/react-hooks";
import { filter, get } from "lodash/fp";
import React, { useContext, useState } from "react";

import { DELETE_HOOP, UPDATE_HOOP } from "../../../graphql/mutations";
import { GET_HOOPS_FULL } from "../../../graphql/queries";
import { IHoop } from "../../../models/hoop.model";

import { AdminContext } from "../../admin/AdminContext";
import { CollectionContext } from "../../collections/Collections";
import ColButton from "../../generic/buttons/ColButton";
import ColCard from "../../generic/layout/card/ColCard";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import ColLoading from "../../generic/loading/ColLoading";
import ColModel from "../../generic/model/ColModel";
import ColViewModel from "../../generic/viewModelStore/ColViewModel";
import { imagePrefix } from "../../utils/functions/isStringImage";
import { scrubData } from "../../utils/functions/scrubData";
import { washData } from "../../utils/functions/washData";

import "./Hoop.css";

export default ({
	hoop,
}: {
	hoop?: IHoop,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoggedIn } = useContext(AdminContext);
	const {
		selectedHoopId,
		setSelectedHoopId,
	} = useContext(CollectionContext);
	const isLoggedInAndEditing = isLoggedIn && isEditing;
	const isSelected = selectedHoopId === get("id", hoop);
	const editingClass = ` hoop--${isLoggedInAndEditing ? "edit" : "readonly"}`;
	const selectedClass = isSelected ? " hoop--selected" : "";
	if (!hoop) {
		return <ColPlaceholder/>;
	} else {
		const scrubbedHoop = scrubData<IHoop>(hoop);
		const hoopModel = new ColViewModel<IHoop>(scrubbedHoop, {
			...placeholders,
			id: hoop.id,
		});
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
			<div className={`hoop${editingClass}${selectedClass}`}
				onClick={() => setSelectedHoopId(hoop.id)}
			>
				<ColCard clickable={!isSelected}>
					{isSelected && !isEditing &&
						<ColButton type="button"
							value="Back"
							action={() => setSelectedHoopId("")}
						/>}
					{isLoggedIn && isSelected && !isEditing && <ColButton type="button"
						value="edit hoop"
						action={() => setIsEditing(true)}
					/>}
					<ColLoading text={"hallie's • hoops •"}
						loading={loading}
						fitChild={true}
						preventClick={false}
					>
						<ColModel viewModel={hoopModel}
							cancel={() => setIsEditing(false)}
							isEditing={isLoggedInAndEditing}
							remove={() => {
								removeHoop();
								setSelectedHoopId("");
							}}
							submit={() => {
								updateHoop({
									variables: washData(hoopModel.updatedDataModel),
								});
								setIsEditing(false);
							}}
						/>
					</ColLoading>
				</ColCard>
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
	image: imagePrefix,
	price: 0,
	recentlyupdatedimage: false,
	sold: false,
	title: "",
};
