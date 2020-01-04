export default `
	type Hoop {
		id: ID
		collections: [Collection] @relation(name:"Has", direction:IN)
		description: String
		image: String
		name: String
		price: Float
		diameter: Float
		sold: Boolean
	}
	type Collection {
		id: ID
		hoops: [Hoop] @relation(name:"Has", direction:OUT)
		name: String
	}
	type AuthPayload {
		token: String!
	}
	type Mutation {
		login(password: String!): AuthPayload
	}
`;
