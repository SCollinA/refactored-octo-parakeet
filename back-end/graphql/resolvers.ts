import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import {
	find,
	get,
} from "lodash/fp";

import { checkPassword, checkScopes } from "../utils";

dotenv.config();

const {
	JWT_SECRET: jwtSecret = "",
} = process.env;

export default {
	Mutation: {
		Login: (obj: any, {password}: any, context: any, info: any) => {
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
		IsLoggedIn: (obj: any, {password}: any, context: any, info: any) => {
			const scopes = checkScopes(get(["headers", "authorization"], context));
			return !!find((scope) => scope === "Hoop: Update", scopes);
		},
	},
};
