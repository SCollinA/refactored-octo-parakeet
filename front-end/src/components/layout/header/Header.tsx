import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

import Loading from "../../generic/loading/Loading";
import SocialLinks from "../../links/social-links/SocialLinks";

import { IImageFile } from "../../../models/file.model";

library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle);

export default () => {
	const [loading, setLoading] = useState(false);
	const { brandImage }: { brandImage: IImageFile } = useStaticQuery(brandImageQuery);
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
					<Img fluid={brandImage.childImageSharp.fluid}
						onStartLoad={() => setLoading(true)}
						onLoad={() => setLoading(false)}
					/>
				</Loading>
			</Link>
			<SocialLinks />
		</div>
	);
};

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
