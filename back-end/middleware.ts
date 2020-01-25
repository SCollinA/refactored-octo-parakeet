import dotenv from "dotenv";
import {
	NextFunction,
	Request,
	Response,
} from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";
import {
	replace,
} from "lodash/fp";
import redisClient from "./redis/client";

dotenv.config();

const {
	ENVIRONMENT: environment,
	JWT_SECRET: jwtSecret,
	RATE_LIMIT: rateLimit,
} = process.env;
if (
	!environment ||
	!jwtSecret ||
	!rateLimit
) {
	throw new Error(`environment variables missing ${process.env}`);
}
export const getBasicAuth = (req: Request, res: Response, next: NextFunction) => {
	if (!req.headers.authorization) {
		const token = createBasicToken();
		req.headers.authorization = `Bearer ${token}`;
	} else {
		try {
			const token = replace("Bearer ", "", req.headers.authorization);
			jwt.verify(token, jwtSecret);
		} catch (err) {
			if (err instanceof JsonWebTokenError) {
				const token = createBasicToken();
				req.headers.authorization = `Bearer ${token}`;
			}
		}
	}
	next();
};

const createBasicToken = () =>
	jwt.sign({
		scopes: ["Hoop: Read", "Collection: Read"],
	}, jwtSecret, {
		expiresIn: "1d",
	});

export const rateLimiter = (req: Request, res: Response, next: NextFunction) => {
	// receive request
	// get bucket for ip from redis
	// incr bucket, if no exists, will be created at 0
	const productionIps = req.headers.forwarded || "";
	const reqIp = environment === "development" ?
		req.ip :
		productionIps.split(/, /)[0];

	redisClient.incr(reqIp, (_, bucket) => {
		// set/update expiration date for key/value in redis
		redisClient.expire(
			reqIp,
			24 * 60 * 60 * 1000, // one day
			() => {
				// tslint:disable-next-line
				console.log("INCR bucket -> " + bucket, "ip", reqIp);
				// for each request, set leak timeout for bucket
				const leak = setTimeout(() => {
					// if bucket not empty
					if (bucket > 0) {
						// decrement bucket and clear timeout
						redisClient.decr(reqIp, () => clearTimeout(leak));
						// else if bucket is negative
					} else if (bucket < 0) {
						// reset to positive
						redisClient.set(reqIp, "0");
					}
				}, 1 * 1000);
				// check bucket
				// if not full
				if (bucket < +rateLimit) {
					// tslint:disable-next-line
					console.log("req approved");
					// call next
					next();
				} else {
					// tslint:disable-next-line
					console.log("req denied");
					res.sendStatus(429);
				}
			},
		);
	});
};
