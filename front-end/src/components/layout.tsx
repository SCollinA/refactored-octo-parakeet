import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import "./layout.css";

export const LayoutContext = React.createContext({});

const Layout = ({
	children,
}: {
	children: ReactNode,
}) => {
	const data = useStaticQuery(graphql`
		query SiteTitleQuery {
			site {
				siteMetadata {
					title
				}
			}
		}
  `);

	return (
		<>
			<Header siteTitle={data.site.siteMetadata.title} />
			<div
				style={{
					margin: `0 auto`,
					maxWidth: 960,
					padding: `0px 1.0875rem 1.45rem`,
					paddingTop: 0,
				}}
			>
				<main>{children}</main>
			</div>
			<Footer/>
		</>
	);
};

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
