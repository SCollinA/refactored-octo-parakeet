import { makeAugmentedSchema } from "neo4j-graphql-js";
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

export default makeAugmentedSchema({
    config: {
        auth: {
            hasScope: true,
        },
        mutation: {
            exclude: [
                "AuthPayload",
            ],
        },
        query: {
            exclude: [
                "AuthPayload",
            ],
        },
    },
    resolvers,
    typeDefs,
});
