import { FluidObject } from "gatsby-image";

export interface IImageFile {
	childImageSharp: {
		fluid: FluidObject;
	};
}
