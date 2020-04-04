import React from "react";

import { library } from "@fortawesome/fontawesome-svg-core";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faTimesCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

import "./Header.scss";

import PageLinks from "../../links/page-links/PageLinks";
import SocialLinks from "../../links/social-links/SocialLinks";

// import { IImageFile } from "../../../models/file.model";
// import ImageFile from "../../images/image-file/ImageFile";
import HamburgerLinks from "../../links/hamburger-links/HamburgerLinks";

library.add(faInstagram, faFacebook, faEnvelope, faAngleLeft, faAngleRight, faTimesCircle);

export default () => {
	// const { brandNameImage }: { brandNameImage: IImageFile } = useStaticQuery(brandNameImageQuery);
	return (
		<div className="header">
			<HamburgerLinks>
				<PageLinks/>
				<SocialLinks instagramUsername={"hallieshoops"}/>
			</HamburgerLinks>
		</div>
	);
};

// const brandNameImageQuery = graphql`
// 	query {
// 		brandNameImage: file(relativePath: { eq: "brand-name.png" }) {
// 			childImageSharp {
// 				fluid(maxWidth: 2000) {
// 					...GatsbyImageSharpFluid_tracedSVG
// 				}
// 			}
// 		}
// 	}
// `;
