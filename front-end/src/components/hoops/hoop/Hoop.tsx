import { get } from "lodash/fp";
import React, { useContext, useState } from "react";

import { IHoop } from "../../../models/hoop.model";

import { AdminContext } from "../../admin/AdminContext";
import { CollectionContext } from "../../collections/Collections";
import ColButton from "../../generic/buttons/ColButton";
import ColCard from "../../generic/layout/card/ColCard";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";

import HoopEdit from "./edit/HoopEdit";
import HoopReadOnly from "./read-only/HoopReadOnly";

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
	if (!hoop) {
		return <ColPlaceholder/>;
	} else {
		return (
			<div className={`hoop${editingClass}`}
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
						<HoopEdit hoop={hoop}
							cancel={() => setIsEditing(false)}
							submit={() => setIsEditing(false)}
						/>}
					{!isEditing &&
						<HoopReadOnly hoop={hoop}/>}
				</ColCard>
			</div>
		);
	}
};
