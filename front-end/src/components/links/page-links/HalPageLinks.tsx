import { Link } from "gatsby";
import React from "react";
import SectionWrapper from "../../generic/layout/section-wrapper/ColSectionWrapper";

import "./HalPageLinks.css";

export default () =>
	<SectionWrapper>
		<div className="hal-page-links">
			<div className="hal-page-link">
				<Link to="/collections" className="clickable"
					activeClassName="activeLink"
				>
					<h2>collections</h2>
				</Link>
			</div>
			<div className="hal-page-link">
				<Link to="/commissions" className="clickable"
					activeClassName="activeLink"
				>
					<h2>commissions</h2>
				</Link>
			</div>
			<div className="hal-page-link">
				<Link to="/about" className="clickable"
					activeClassName="activeLink"
				>
					<h2>about</h2>
				</Link>
			</div>
			<div className="hal-page-link">
				<Link to="/contact" className="clickable"
					activeClassName="activeLink"
				>
					<h2>contact</h2>
				</Link>
			</div>
		</div>
	</SectionWrapper>;
