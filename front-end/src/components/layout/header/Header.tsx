import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

import Loading from "../../generic/loading/ColLoading";
import SocialLinks from "../../links/social-links/HalSocialLinks";

import { IImageFile } from "../../../models/file.model";
import ImageFile from "../../images/image-file/ImageFile";

library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle);

export default () => {
	const { brandImage }: { brandImage: IImageFile } = useStaticQuery(brandImageQuery);
	return (
		<div className="hal-header">
			<Link to="/"
				className="clickable hal-header__home-link"
				activeClassName="activeLink"
				style={{
					color: `white`,
					textDecoration: `none`,
				}}
			>
				<ImageFile file={brandImage}
					loadingText={"hallie's • hoops •"}
				/>
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
