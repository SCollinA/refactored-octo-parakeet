import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import SectionWrapper from "./generic/SectionWrapper";

import PageLinks from "./PageLinks";
import SocialLinks from "./SocialLinks";

export default () => {
	const [isExpanded, setIsExpanded] = React.useState(false);
	return (
		<div className={`HamburgerLinks${isExpanded ? " expandedMenu" : ""}`}
			onClick={() =>
				setIsExpanded(!isExpanded)}
		>
			<FontAwesomeIcon icon={["far", "times-circle"]} size="3x" />
			{isExpanded &&
				<SectionWrapper>
					<PageLinks />
					<SocialLinks />
				</SectionWrapper>
			}
		</div>
	);
};
