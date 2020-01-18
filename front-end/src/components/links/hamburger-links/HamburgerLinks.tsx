import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, ReactNodeArray } from "react";

import SectionWrapper from "../../generic/layout/section-wrapper/ColSectionWrapper";

import PageLinks from "../page-links/PageLinks";
import SocialLinks from "../social-links/SocialLinks";

import "./HamburgerLinks.css";

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	const [isExpanded, setIsExpanded] = React.useState(false);
	const expandedClass = isExpanded ? " hamburger-links--expanded" : "";
	return (
		<div className={`hamburger-links${expandedClass}`}
			onClick={() =>
				setIsExpanded(!isExpanded)}
		>
			<FontAwesomeIcon icon={["far", "times-circle"]} size="3x" />
			{isExpanded &&
				<SectionWrapper>
					{children}
				</SectionWrapper>
			}
		</div>
	);
};
