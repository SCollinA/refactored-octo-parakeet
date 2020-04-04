import { Link } from "gatsby";
import React from "react";

import "./PageLinks.scss";

export default () =>
	<div className="page-links">
		<div className="page-links__page-link page-links__page-link--home">
			<Link to="/" className="selectable"
				activeClassName="selectable--selected"
			>
				Hallie's
			</Link>
			<Link to="/" className="selectable"
				activeClassName="selectable--selected"
			>
				Hoops
			</Link>
		</div>
		<div className="page-links__page-link">
			<Link to="/collections" className="selectable"
				activeClassName="selectable--selected"
			>
				<h2>collections</h2>
			</Link>
		</div>
		<div className="page-links__page-link">
			<Link to="/commissions" className="selectable"
				activeClassName="selectable--selected"
			>
				<h2>commissions</h2>
			</Link>
		</div>
		<div className="page-links__page-link">
			<Link to="/about" className="selectable"
				activeClassName="selectable--selected"
			>
				<h2>about</h2>
			</Link>
		</div>
		<div className="page-links__page-link">
			<Link to="/contact" className="selectable"
				activeClassName="selectable--selected"
			>
				<h2>contact</h2>
			</Link>
		</div>
	</div>;
