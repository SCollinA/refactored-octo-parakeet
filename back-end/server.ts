import { ApolloServer } from "apollo-server-express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import http from "http";
import neo4j from "neo4j-driver";

import schema from "./graphql/schema";
import {
    getBasicAuth,
    rateLimiter,
} from "./middleware";

dotenv.config();

const {
    DB_URI: uri,
    DB_USERNAME: user,
    DB_PASSWORD: password,
    JWT_SECRET: jwtSecret,
} = process.env;
if (
    !uri ||
    !user ||
    !password ||
    !jwtSecret
) {
    throw new Error(`environment variables missing ${process.env}`);
}
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));

const apollo = new ApolloServer({
    context: ({ req }) => ({
        driver,
        ...req,
    }),
    schema,
    // code below would be used to authenticate subscription
    // subscriptions: {
    //     onConnect: (connectionParams, webSocket) => {
    //         if (connectionParams.authToken) {
    //             return checkLoggedIn(connectionParams.authToken)
    //         }
    //         throw new Error('Missing auth token')
    //     }
    // },
});
const app = express();
app.use(helmet());
app.use(rateLimiter);
app.use(getBasicAuth);
app.disable("x-powered-by");
app.use(bodyParser.json({limit: "5mb"}));
app.use(express.static("../front-end/build"));
apollo.applyMiddleware({ app });

const server = http.createServer(app);
apollo.installSubscriptionHandlers(server);

const config = {
    hostname: "http://localhost",
    path: apollo.graphqlPath,
    port: process.env.API_PORT,
};

server.listen(config, () => {
    // tslint:disable-next-line
    console.log(
        `Server ready at`,
        `${config.hostname}:${config.port}${config.path}`,
    );
});
