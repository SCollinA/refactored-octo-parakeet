import React, { useContext, useState } from "react";

import { IHoop } from "../../../models/hoop.model";

import { AdminContext } from "../../admin/AdminContext";
import ColButton from "../../generic/buttons/ColButton";
import ColPlaceholder from "../../generic/layout/placeholder/ColPlaceholder";
import HoopEdit from "./edit/HoopEdit";
import HoopReadOnly from "./read-only/HoopReadOnly";

export default ({
	hoop,
	isSelected,
	selectHoop = () => undefined,
}: {
	hoop?: IHoop,
	isSelected?: boolean,
	selectHoop?: () => void,
}) => {
	const [isEditing, setIsEditing] = useState(false);
	const { isLoggedIn } = useContext(AdminContext);
	const isLoggedInAndEditing = isLoggedIn && isEditing;
	const className = `hoop hoop--${isLoggedInAndEditing ? "edit" : "readonly"}`;
	if (!hoop) {
		return <ColPlaceholder/>;
	} else {
		return (
			<div className={className}
				onClick={() => selectHoop()}
			>
				{isLoggedIn && isSelected && <ColButton type="button"
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
			</div>
		);
	}
};