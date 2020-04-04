import React, { ReactNode } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";

import "./Layout.scss";

import AdminContext from "../admin/AdminContext";
import LinkImports from "../utils/components/LinkImports";
import SEO from "../utils/components/SEO";

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	return (
		<AdminContext>
			<SEO title="Hallie's Hoops"></SEO>
			<LinkImports></LinkImports>
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
