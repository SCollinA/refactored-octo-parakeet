import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

import { IJWTPayload } from "./models/JWTPayload.model";

dotenv.config();

const {
	ADMIN_PW: adminPw,
	JWT_SECRET: jwtSecret,
} = process.env;

if (
	!adminPw ||
	!jwtSecret
) {
	throw new Error(`environment vars not configured ${process.env}`);
}

export const checkScopes = (authorization: string) => {
	if (authorization) {
		const token = authorization.replace("Bearer ", "");
		if (!jwtSecret) { throw new Error("app secret not found"); }
		const { scopes } = jwt.verify(token, jwtSecret) as IJWTPayload;
		return scopes;
	}
	throw new Error("not authenticated");
};

export const checkPassword = (password: string): boolean => {
	const saltRounds = 10;
	const salt = bcrypt.genSaltSync(saltRounds);
	const pwHash = bcrypt.hashSync(adminPw, salt);
	const pwMatch = bcrypt.compareSync(password, pwHash);
	return pwMatch;
};
