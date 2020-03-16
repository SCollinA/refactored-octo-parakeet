import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

import "./SocialLinks.css";

export default ({
	instagramUsername,
	facebookUsername,
}: {
	instagramUsername?: string,
	facebookUsername?: string,
}) => (
		<div className="social-links">
			{!!instagramUsername &&
				<div className="social-link clickable">
					<a rel="noopener noreferrer" target="_blank" href={`https://www.instagram.com/${instagramUsername}/`}>
						<FontAwesomeIcon icon={["fab", "instagram"]} size="2x"/>
					</a>
				</div>}
			{!!facebookUsername &&
					<div className="social-link clickable">
					<a rel="noopener noreferrer" target="_blank" href="https://www.facebook.com/mkcrfineart/">
						<FontAwesomeIcon icon={["fab", "facebook"]} size="2x"/>
					</a>
				</div>}
		</div>
);
