import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
	find,
	get,
} from "lodash/fp";

import { checkPassword, checkScopes } from "../utils";
import { IResolvers } from "graphql-tools";

dotenv.config();

const {
	JWT_SECRET: jwtSecret = "",
} = process.env;

const resolvers: IResolvers = {
	Mutation: {
		Login: (_obj: any, {password}: any, _context: any, _info: any) => {
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
			} else {
				throw new Error("bad password");
			}
		},
	},
	Query: {
		IsLoggedIn: (_obj: any, _args: any, context: any, _info: any) => {
			const scopes = checkScopes(get(["headers", "authorization"], context));
			return !!find((scope) => scope === "Hoop: Update", scopes);
		},
	},
};

export default resolvers;
