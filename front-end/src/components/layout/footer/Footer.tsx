import React from "react";

import SectionWrapper from "../../../generic/layout/section-wrapper/ColSectionWrapper";

import AdminLogin from "../../admin/AdminLogin";

import "./Footer.css";

export default () =>
	<footer className="footer">
		<SectionWrapper>
			<span className="footer__copyright">
				<p>© {new Date().getFullYear()},&nbsp;</p>
				<p>Hallie's Hoops</p>
			</span>
			<p className="footer__copyright-message">
				All images on this site are copyrighted
				and may not be reproduced without written permission.
			</p>
			<AdminLogin></AdminLogin>
		</SectionWrapper>
	</footer>;
