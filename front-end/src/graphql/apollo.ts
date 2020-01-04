import { InMemoryCache, NormalizedCacheObject } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { ApolloLink, GraphQLRequest } from "apollo-link";
import { setContext } from "apollo-link-context";
import { createHttpLink } from "apollo-link-http";
import fetch from "isomorphic-fetch";
import { isNull } from "lodash/fp";
// Import { split } from 'apollo-link'
// Import { WebSocketLink } from 'apollo-link-ws'
// Import { getMainDefinition } from 'apollo-utilities'

// // Create a WebSocket link:
// Const wsLink = process.browser ? new WebSocketLink({
//   Uri: `ws://localhost:4000/graphql`,
//   Options: {
//     Reconnect: true,
//     // the below would be used to have authenticated subscriptions
//     // connectionParams: {
//     //   authToken: localStorage.getItem('auth-token')
//     // }
//   },
// }) : null

const httpLink: ApolloLink = setContext((_: GraphQLRequest, { headers }: Request) => {
		const token = localStorage.getItem("auth-token");

		return {
			headers: {
				...headers,
				authorization: !isNull(token) ? `Bearer ${token}` : "",
			},
		};
	})
	.concat(createHttpLink({
		fetch,
		uri: "http://localhost:8008/graphql",
		// uri: "https://hallieshoops.com/graphql",
}));

// // using the ability to split links, you can send data to each link
// // depending on what kind of operation is being sent
// Const link = process.browser ? split(
//   // split based on operation type
//   ({ query }) => {
//     Const { kind, operation } = getMainDefinition(query);
//     Return kind === 'OperationDefinition' && operation === 'subscription';
//   },
//   WsLink, // comes here if above callback returns true
//   HttpLink,
// ) : httpLink

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
	cache: new InMemoryCache(),
	// Link,
	link: httpLink,
});

export default client;
