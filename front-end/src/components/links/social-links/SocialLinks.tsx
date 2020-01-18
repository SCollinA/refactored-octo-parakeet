import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./SocialLinks.css";

export default () => (
		<div className="hal-social-links">
			<div className="socialLink clickable">
				<a rel="noopener noreferrer" target="_blank" href="https://www.instagram.com/mkcrfineart/">
					<FontAwesomeIcon icon={["fab", "instagram"]} size="2x"/>
				</a>
			</div>
			<div className="hal-social-link clickable">
				<a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/mkcrfineart/">
					<FontAwesomeIcon icon={["fab", "facebook"]} size="2x"/>
				</a>
			</div>
		</div>
);
