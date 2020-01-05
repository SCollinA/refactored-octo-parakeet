import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import React, { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import Loading from "../generic/loading/Loading";

import SocialLinks from "../social-links/SocialLinks";
library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle);

import "./Header.css";

const header = () => {
	const [loading, setLoading] = useState(false);
	const data = useStaticQuery(brandImageQuery);
	return (
		<div className="Header">
			<Link to="/"
				className="clickable homeLink"
				activeClassName="activeLink"
				style={{
					color: `white`,
					textDecoration: `none`,
				}}
			>
				<Loading text={"hallie's • hoops •"}
					loading={loading}
					fitChild={true}
					preventClick={false}
				>
					<Img fluid={data.brandImage.childImageSharp.fluid}
						onStartLoad={() => setLoading(true)}
						onLoad={() => setLoading(false)}
					/>
				</Loading>
			</Link>
			<SocialLinks />
		</div>
	);
};

header.propTypes = {
	siteTitle: PropTypes.string,
};

header.defaultProps = {
	siteTitle: ``,
};

export default header;

const brandImageQuery = graphql`
	query {
		brandImage: file(relativePath: { eq: "brand.png" }) {
			childImageSharp {
				fluid(maxWidth: 2000) {
					...GatsbyImageSharpFluid_tracedSVG
				}
			}
		}
	}
`;
