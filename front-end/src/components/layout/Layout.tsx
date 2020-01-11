import React, { ReactNode, Reducer, useReducer } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";

import HamburgerLinks from "../links/hamburger-links/HamburgerLinks";
import PageLinks from "../links/page-links/PageLinks";

import "./Layout.css";

import { ELayoutActionTypes, ILayoutAction, ILayoutState } from "../../models/layout.model";

export const LayoutContext = React.createContext({});

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);
	const context = {
		...state,
		login: (isLoggedIn: boolean) => dispatch({
			isLoggedIn,
			type: ELayoutActionTypes.Login,
		}),
	};
	return (
		<LayoutContext.Provider value={context}>
			<div className="layout">
				<Header/>
				<HamburgerLinks/>
				<PageLinks/>
				<div className="layout__content">
					<main>{children}</main>
				</div>
				<Footer/>
			</div>
		</LayoutContext.Provider>
	);
};

const layoutState: ILayoutState = {
	isLoggedIn: false,
};

const layoutReducer: Reducer<ILayoutState, ILayoutAction> =
	(state: ILayoutState, action: ILayoutAction): ILayoutState => {
		switch (action.type) {
			case ELayoutActionTypes.Login:
				return {
					isLoggedIn: !state.isLoggedIn,
				};
		}
	};
