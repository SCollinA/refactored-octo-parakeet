import React, { ReactNode } from "react";

import AdminContext from "../admin/AdminContext";
import LinkImports from "../utils/components/LinkImports";
import SEO from "../utils/components/SEO";

import Loading from "./loading/Loading";
import Footer from "./footer/Footer";
import Header from "./header/Header";

import "./Layout.scss";

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
				<Loading>
					<div className="layout__content">
						<main>{children}</main>
					</div>
				</Loading>
				<Footer/>
			</div>
		</AdminContext>
	);
};
