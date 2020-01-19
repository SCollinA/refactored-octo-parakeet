import { get } from "lodash/fp";
import React, { useContext, useState } from "react";

import { IHoop } from "../../../models/hoop.model";

import { AdminContext } from "../../admin/AdminContext";
import { CollectionContext } from "../../collections/Collections";
import ColButton from "../../generic/buttons/ColButton";
import ColCard from "../../generic/layout/card/ColCard";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import ColViewModel from "../../generic/viewModelStore/ColViewModel";
import { imagePrefix } from "../../utils/functions/isStringImage";
import { scrubData } from "../../utils/functions/scrubData";

import HoopEdit from "./edit/HoopEdit";
import HoopReadOnly from "./read-only/HoopReadOnly";

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
					{isLoggedInAndEditing &&
						<HoopEdit hoopModel={hoopModel}
							cancel={() => setIsEditing(false)}
							remove={() => setSelectedHoopId("")}
							submit={() => setIsEditing(false)}
						/>}
					{!isEditing &&
						<HoopReadOnly hoopModel={hoopModel}/>}
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
