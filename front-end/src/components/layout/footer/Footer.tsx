import React from "react";

import SectionWrapper from "../../generic/layout/section-wrapper/SectionWrapper";

import AdminLogin from "../../admin/AdminLogin";

import "./Footer.css";

export default () =>
	<footer className="footer">
		<SectionWrapper>
			<span>
				<p>© {new Date().getFullYear()},&nbsp;</p>
				<p>Hallie's Hoops</p>
			</span>
			<p>
				All images on this site are copyrighted
				and may not be reproduced without written permission.
			</p>
			<AdminLogin></AdminLogin>
		</SectionWrapper>
	</footer>;
