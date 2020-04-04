import { Link } from "gatsby";
import React from "react";

import "./PageLinks.scss";

export default () =>
	<div className="page-links">
		<div className="page-link">
			<Link to="/collections" className="page-link__link selectable"
				activeClassName="selected"
			>
				<h2>collections</h2>
			</Link>
		</div>
		<div className="page-link">
			<Link to="/commissions" className="page-link__link selectable"
				activeClassName="selectable--selected"
			>
				<h2>commissions</h2>
			</Link>
		</div>
		<div className="page-link">
			<Link to="/about" className="page-link__link selectable"
				activeClassName="selectable--selected"
			>
				<h2>about</h2>
			</Link>
		</div>
		<div className="page-link">
			<Link to="/contact" className="page-link__link selectable"
				activeClassName="selectable--selected"
			>
				<h2>contact</h2>
			</Link>
		</div>
	</div>;
