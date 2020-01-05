import PropTypes from "prop-types";
import React, { ReactNode, useReducer, Reducer } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";
import HamburgerLinks from "./hamburger-links/HamburgerLinks";
import PageLinks from "./page-links/PageLinks";

import "./Layout.css";

import { ILayoutState, ILayoutAction, ELayoutActionTypes } from "../models/layout.model";

export const LayoutContext = React.createContext({});

const Layout = ({
	children,
}: {
	children: ReactNode,
}) => {
	const [state, dispatch] = useReducer(layoutReducer, layoutState);
	const context = {
		...state,
		login: (isLoggedIn: boolean) => dispatch({
			type: ELayoutActionTypes.Login,
			isLoggedIn,
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

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

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