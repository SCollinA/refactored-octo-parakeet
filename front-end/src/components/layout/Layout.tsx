import React, { ReactNode } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";

import "../generic/styles/effects.css";
import "./Layout.css";

import AdminContext from "../admin/AdminContext";

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	return (
		<AdminContext>
			<div className="layout">
				<Header/>
				<div className="layout__content">
					<main>{children}</main>
				</div>
				<Footer/>
			</div>
		</AdminContext>
	);
};
