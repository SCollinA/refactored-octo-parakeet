import React, { createContext, ReactNode, useState } from "react";

import ColLoading from "../../../components-collin/loading/ColLoading";

import "./Loading.scss";

export interface ILoadingContext {
	loading: boolean;
	setLoading: (value: boolean, key: string) => void;
}

const loadingSet = new Set<string>();

const initialContext: ILoadingContext = {
	loading: false,
	setLoading: (_value: boolean, _key: string) => undefined,
}

export const LoadingContext = createContext<ILoadingContext>(initialContext);

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	const [loading, setLoading] = useState(false);
	const context: ILoadingContext = {
		loading,
		setLoading: (value, key) => {
			// console.log("setting loading", key, value)
			if (value) {
				loadingSet.add(key)
			} else {
				loadingSet.delete(key);
			}
			if (loading !== !!loadingSet.size) {
				setLoading(!!loadingSet.size);
				// console.log("loading state", loading, loadingSet)
			}
		}
	}
	return <ColLoading text={"hallie's • hoops •"}
		loading={context.loading}
		fitChild={true}
		preventClick={true}
	>
		<LoadingContext.Provider value={context}>
			{children}
		</LoadingContext.Provider>
	</ColLoading>};
