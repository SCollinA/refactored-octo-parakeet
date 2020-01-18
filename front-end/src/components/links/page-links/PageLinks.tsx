import { Link } from "gatsby";
import React from "react";

import SectionWrapper from "../../generic/layout/section-wrapper/ColSectionWrapper";

import "./PageLinks.css";

export default () =>
	<SectionWrapper>
		<div className="page-links">
			<div className="page-link">
				<Link to="/collections" className="clickable"
					activeClassName="page-link--active"
				>
					<h2>collections</h2>
				</Link>
			</div>
			<div className="page-link">
				<Link to="/commissions" className="clickable"
					activeClassName="page-link--active"
				>
					<h2>commissions</h2>
				</Link>
			</div>
			<div className="page-link">
				<Link to="/about" className="clickable"
					activeClassName="page-link--active"
				>
					<h2>about</h2>
				</Link>
			</div>
			<div className="page-link">
				<Link to="/contact" className="clickable"
					activeClassName="page-link--active"
				>
					<h2>contact</h2>
				</Link>
			</div>
		</div>
	</SectionWrapper>;
