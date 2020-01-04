import { graphql, useStaticQuery } from "gatsby";
import PropTypes from "prop-types";
import React from "react";
import Helmet from "react-helmet";

function SEO({
	description,
	lang = "",
	meta = [],
	title,
}: {
	description?: string,
	lang?: string,
	meta?: any[],
	title: string,
}) {
	const { site } = useStaticQuery(
		graphql`
			query {
				site {
					siteMetadata {
						title
						description
						author
					}
				}
			}
		`,
	);

	const metaDescription = description || site.siteMetadata.description;

	return (
		<Helmet
			htmlAttributes={{
				lang,
			}}
			title={title}
			titleTemplate={`%s | ${site.siteMetadata.title}`}
			meta={[
				{
					content: metaDescription,
					name: `description`,
				},
				{
					content: title,
					property: `og:title`,
				},
				{
					content: metaDescription,
					property: `og:description`,
				},
				{
					content: `website`,
					property: `og:type`,
				},
				{
					content: `summary`,
					name: `twitter:card`,
				},
				{
					content: site.siteMetadata.author,
					name: `twitter:creator`,
				},
				{
					content: title,
					name: `twitter:title`,
				},
				{
					content: metaDescription,
					name: `twitter:description`,
				},
			].concat(meta)}
		/>
	);
}

SEO.defaultProps = {
	description: ``,
	lang: `en`,
	meta: [],
};

SEO.propTypes = {
	description: PropTypes.string,
	lang: PropTypes.string,
	meta: PropTypes.arrayOf(PropTypes.object),
	title: PropTypes.string.isRequired,
};

export default SEO;
