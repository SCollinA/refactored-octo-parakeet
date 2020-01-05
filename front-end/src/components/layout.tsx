import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";

import Footer from "./footer/Footer";
import Header from "./header/Header";
import HamburgerLinks from "./hamburger-links/HamburgerLinks";
import PageLinks from "./page-links/PageLinks";

import "./Layout.css";

export const LayoutContext = React.createContext({});

const Layout = ({
	children,
}: {
	children: ReactNode,
}) => {
	const data = useStaticQuery(siteMetadata);
	return (
		<div className="layout">
			<Header siteTitle={data.site.siteMetadata.title}/>
			<HamburgerLinks/>
			<PageLinks/>
			<div className="layout__content">
				<main>{children}</main>
			</div>
			<Footer/>
		</div>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;

const siteMetadata = graphql`
	query SiteTitleQuery {
		site {
			siteMetadata {
				title
			}
		}
	}
`;
