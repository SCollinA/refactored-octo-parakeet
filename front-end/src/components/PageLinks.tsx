import { Link } from "gatsby";
import React from "react";
import SectionWrapper from "./generic/SectionWrapper";

export default () => (
		<SectionWrapper>
			<div className="PageLinks">
				<div className="pageLink">
					<Link to="/gallery" className="clickable"
						activeClassName="activeLink"
					>
						<h2>gallery</h2>
					</Link>
				</div>
				<div className="pageLink">
					<Link to="/about" className="clickable"
						activeClassName="activeLink"
					>
						<h2>about</h2>
					</Link>
				</div>
				<div className="pageLink">
					<Link to="/commissions" className="clickable"
						activeClassName="activeLink"
					>
						<h2>commissions</h2>
					</Link>
				</div>
				<div className="pageLink">
					<Link to="/contact" className="clickable"
						activeClassName="activeLink"
					>
						<h2>contact</h2>
					</Link>
				</div>
			</div>
		</SectionWrapper>
);
