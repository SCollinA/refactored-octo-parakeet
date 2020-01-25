import { graphql } from "gatsby";
import gql from "graphql-tag";

export const HOOP_BASIC_FRAGMENT = gql`
    fragment HoopBasic on Hoop {
        id
        title
        description
        diameter
        price
        sold
    }
`;

export const HOOP_WITH_IMAGE_FRAGMENT = gql`
    fragment HoopWithImage on Hoop {
        ...HoopBasic
        image
    }
    ${HOOP_BASIC_FRAGMENT}
`;

export const COLLECTION_FULL_FRAGMENT = gql`
    fragment CollectionFull on Collection {
		id
        name
    }
`;

export const HOOP_FULL_FRAGMENT = gql`
    fragment HoopFull on Hoop {
        ...HoopWithImage
        collections {
            ...CollectionFull
        }
    }
    ${HOOP_WITH_IMAGE_FRAGMENT}
    ${COLLECTION_FULL_FRAGMENT}
`;

// export const FLUID_IMAGE_FRAGMENT = graphql`
// 	fragment FluidImage on File {
// 		childImageSharp {
// 			fluid(maxWidth: 3000, quality: 100, srcSetBreakpoints: [200, 340, 520, 890]) {
// 				...GatsbyImageSharpFluid_tracedSVG
// 			}
// 		}
// 	}
// `;

// export const FIXED_IMAGE_FRAGMENT = graphql`
// 	fragment FixedImage on File {
// 		childImageSharp {
// 			fixed(width: 3000, quality: 100) {
// 				...GatsbyImageSharpFixed_tracedSVG
// 			}
// 		}
// 	}
// `;
