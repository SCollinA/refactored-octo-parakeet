import { graphql, Link, useStaticQuery } from "gatsby";
import Img from "gatsby-image";
import React, { useState } from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./Header.css";

import Loading from "../../generic/loading/ColLoading";
import PageLinks from "../../links/page-links/PageLinks";
import SocialLinks from "../../links/social-links/SocialLinks";

import { IImageFile } from "../../../models/file.model";
import ImageFile from "../../images/image-file/ImageFile";
import HamburgerLinks from "../../links/hamburger-links/HamburgerLinks";

library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle);

export default () => {
	const { brandImage }: { brandImage: IImageFile } = useStaticQuery(brandImageQuery);
	return (
		<div className="header">
			<Link to="/"
				className="clickable header__home-link"
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
			<HamburgerLinks>
				<SocialLinks/>
				<PageLinks/>
			</HamburgerLinks>
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
