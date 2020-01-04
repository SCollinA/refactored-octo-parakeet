import { Link } from "gatsby";
import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/SEO";
import StaticImage from "../components/images/ImageStatic";

const IndexPage = () => (
	<Layout>
		<SEO title="Home" />
		<h1>Hi people</h1>
		<p>Welcome to your new Gatsby site.</p>
		<p>Now go build something great.</p>
		<div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
			<StaticImage />
		</div>
		<Link to="/page-2/">Go to page 2</Link>
	</Layout>
);

export default IndexPage;
