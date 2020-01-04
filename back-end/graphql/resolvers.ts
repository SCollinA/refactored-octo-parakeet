import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import { neo4jgraphql } from "neo4j-graphql-js";
import { IJWTPayload } from "../models/JWTPayload.model";
import { checkScopes } from "../utils";

dotenv.config();

const {
    JWT_SECRET: jwtSecret = "",
} = process.env;

export default {
    Mutation: {
        login: (obj: any, args: any, context: any, info: any) => {
            const token = jwt.sign({
                scopes: [
                    "Hoop: Create",
                    "Hoop: Read",
                    "Hoop: Update",
                    "Hoop: Delete",
                    "Collection: Create",
                    "Collection: Read",
                    "Collection: Update",
                    "Collection: Delete",
                ],
            }, jwtSecret, {
                expiresIn: "1d",
            });
            return {
                token,
            };
        },
    },
};
