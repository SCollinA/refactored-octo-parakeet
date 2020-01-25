export default `
	type Hoop {
		id: ID!
		collections: [Collection] @relation(name:"Has", direction:IN)
		description: String
		image: String
		recentlyupdatedimage: Boolean
		title: String
		price: Float
		diameter: Float
		sold: Boolean
	}
	type Collection {
		id: ID!
		hoops: [Hoop] @relation(name:"Has", direction:OUT)
		name: String
	}
	input HoopInput {
		id: ID!
		description: String
		image: String
		recentlyupdatedimage: Boolean
		title: String
		price: Float
		diameter: Float
		sold: Boolean
	}
	input CollectionInput {
		id: ID!
		name: String
	}
	type AuthPayload {
		token: String!
	}
	type Query {
		IsLoggedIn: Boolean!
	}
	type Mutation {
		Login(password: String!): AuthPayload
		UpdateHoops(hoops: [HoopInput]): [Hoop] @cypher(statement:
		"""
			UNWIND $hoops AS updateHoop
			MATCH (hoop: Hoop)
			WHERE hoop.id = updateHoop.id
			SET hoop += updateHoop
			RETURN hoop
		""")
		UpdateCollections(collections: [CollectionInput]): [Collection] @cypher(statement:
		"""
			UNWIND $collections AS updateCollection
			MATCH (collection: Collection)
			WHERE collection.id = updateCollection.id
			SET collection += updateCollection
			RETURN collection
		""")
	}
`;
