import React, { ReactNode } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";

import "./Layout.css";

import AdminContext from "../admin/AdminContext";
import HamburgerLinks from "../links/hamburger-links/HamburgerLinks";
import PageLinks from "../links/page-links/HalPageLinks";

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	return (
		<AdminContext>
			<div className="layout">
				<Header/>
				<HamburgerLinks/>
				<PageLinks/>
				<div className="layout__content">
					<main>{children}</main>
				</div>
				<Footer/>
			</div>
		</AdminContext>
	);
};
