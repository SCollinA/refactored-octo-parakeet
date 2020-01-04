import React from "react";

import SectionWrapper from "./generic/SectionWrapper";

import AdminLogin from "./AdminLogin";

export default () =>
	<SectionWrapper>
		<footer className="Footer">
			<span>
				<p>© {new Date().getFullYear()},&nbsp;</p>
				<p>mkcrfineart</p>
			</span>
			<p>
				All images on this site are copyrighted by the artist
				and may not be reproduced without written permission
				of the artist.
			</p>
			<AdminLogin></AdminLogin>
		</footer>
	</SectionWrapper>;
