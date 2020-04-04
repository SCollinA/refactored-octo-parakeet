import React, { ReactNode, createContext, useState } from "react";

export interface ICollectionContext {
	selectedCollectionId: string;
	selectedHoopId: string;
	setSelectedCollectionId: (selectedCollectionId: string) => void;
	setSelectedHoopId: (selectedCollectionId: string) => void;
}

export const CollectionContext = createContext<ICollectionContext>({
	selectedCollectionId: "",
	selectedHoopId: "",
	setSelectedCollectionId: () => null,
	setSelectedHoopId: () => null,
});

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	const [selectedCollectionId, setSelectedCollectionId] = useState<string>("");
	const [selectedHoopId, setSelectedHoopId] = useState<string>("");
	const context: ICollectionContext = {
		selectedCollectionId,
		selectedHoopId,
		setSelectedCollectionId,
		setSelectedHoopId,
	};
	return <CollectionContext.Provider value={context}>
		{children}
	</CollectionContext.Provider>;
}