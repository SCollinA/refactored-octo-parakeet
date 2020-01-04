import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { checkPassword } from "../utils";

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
};
