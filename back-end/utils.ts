import jwt from "jsonwebtoken";

import { IJWTPayload } from "./models/JWTPayload.model";

export const checkScopes = (authorization: string) => {
    if (authorization) {
      const token = authorization.replace("Bearer ", "");
      const secret = process.env.JWT_SECRET;
      if (!secret) { throw new Error("app secret not found"); }
      const { scopes } = jwt.verify(token, secret) as IJWTPayload;
      return scopes;
    }
    throw new Error("not authenticated");
};
