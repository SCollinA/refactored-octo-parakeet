import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode, useEffect, useState } from "react";

import SectionWrapper from "../../generic/layout/section-wrapper/ColSectionWrapper";

import "./HamburgerLinks.css";

export default ({
	children,
}: {
	children: ReactNode,
}) => {
	const [isExpanded, setIsExpanded] = useState(false);
	const [isWindowWide, setIsWindowWide] = useState(window.innerWidth > 500);
	useEffect(() => {
		window.onresize = () => setIsWindowWide(window.innerWidth > 500);
		return () => {
			window.onresize = () => undefined;
		};
	}, [window.innerWidth]);
	const shouldShowLinks = isExpanded || isWindowWide;
	const expandedClass = shouldShowLinks ? " hamburger-links--expanded" : "";
	return (
		<div className={`hamburger-links${expandedClass}`}
			onClick={() =>
				setIsExpanded(!isExpanded)}
		>
			{!isWindowWide &&
				<FontAwesomeIcon icon={["far", "times-circle"]} size="3x" />}
			{shouldShowLinks &&
				<div className="hamburger-links__content">
					{/* <SectionWrapper> */}
						{children}
					{/* </SectionWrapper> */}
				</div>
			}
		</div>
	);
};
