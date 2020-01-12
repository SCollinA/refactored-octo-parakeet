import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { map } from "lodash/fp";
import { neo4jgraphql } from "neo4j-graphql-js";

import { checkPassword } from "../utils";

import { ICollection } from "../../front-end/src/models/collection.model";
import { IHoop } from "../../front-end/src/models/hoop.model";

dotenv.config();

const {
	JWT_SECRET: jwtSecret = "",
} = process.env;

export default {
	Mutation: {
		login: (obj: any, {password}: any, context: any, info: any) => {
			if (checkPassword(password)) {
				const token = jwt.sign({
					scopes: [
						"Hoop: Create",
						"Hoop: Read",
						"Hoop: Update",
						"Hoop: Delete",
						"Hoop: Merge",
						"Collection: Create",
						"Collection: Read",
						"Collection: Update",
						"Collection: Delete",
						"Collection: Merge",
					],
				}, jwtSecret, {
					expiresIn: "1d",
				});
				return {
					token,
				};
			}
			return null;
		},
	},
	// UpdateCollections: (obj: any, collections: ICollection[], context: any, info: any) => {
	// 	return map(
	// 		(collection) => {
	// 			neo4jgraphql(obj, collection, context, info);
	// 		},
	// 		collections,
	// 	);
	// },
	// UpdateHoops: (obj: any, hoops: IHoop[], context: any, info: any) => {
	// 	return map(
	// 		(hoop) => {
	// 			neo4jgraphql(obj, hoop, context, info);
	// 		},
	// 		hoops,
	// 	);
	// },
};
