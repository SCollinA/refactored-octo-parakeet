import gql from "graphql-tag";
import {
	COLLECTION_FULL_FRAGMENT,
	HOOP_FULL_FRAGMENT,
} from "./fragments";

const CollectionInputParams = `
	$id: ID!,
	$name: String,
`;
const CollectionInputArgs = `
	id: $id,
	name: $name,
`;

const HoopInputParams = `
	$id: ID!,
	$name: String,
	$description: String,
	$diameter: Float,
	$image: String,
	$price: Float,
	$sold: Boolean,
`;
const HoopInputArgs = `
	id: $id,
	name: $name,
	description: $description,
	diameter: $diameter,
	image: $image,
	price: $price,
	sold: $sold,
`;

export const LOGIN = gql`
	mutation login($password: String!) {
		login(password: $password) {
			token
		}
	}
`;

export const CREATE_COLLECTION = gql`
	mutation createCollection(${CollectionInputParams}) {
		CreateCollection(${CollectionInputArgs}) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const MERGE_COLLECTION = gql`
	mutation mergeCollection(${CollectionInputParams}) {
		MergeCollection(${CollectionInputArgs}) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const UPDATE_COLLECTION = gql`
	mutation updateCollection(${CollectionInputParams}) {
		UpdateCollection(${CollectionInputArgs}) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const DELETE_COLLECTION = gql`
	mutation deleteCollection($id: ID!) {
		DeleteCollection(id: $id) {
			id
		}
	}
`;

export const CREATE_HOOP = gql`
	mutation createHoop(${HoopInputParams}) {
		CreateHoop(${HoopInputArgs}) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
`;

export const MERGE_HOOP = gql`
	mutation mergeHoop(${HoopInputParams}) {
		MergeHoop(${HoopInputArgs}) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
`;

export const UPDATE_HOOP = gql`
	mutation updateHoop(${HoopInputParams}) {
		UpdateHoop(${HoopInputArgs}) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
`;

export const DELETE_HOOP = gql`
	mutation deleteHoop($id: ID!) {
		DeleteHoop(id: $id) {
			id
		}
	}
`;

export const ADD_COLLECTION_HOOPS = gql`
	mutation addCollectionHoops(
		$collectionId: ID!,
		$hoopId: ID!
	) {
		AddCollectionHoops(
			from: { id: $collectionId }
			to: { id: $hoopId }
		) {
			from {
				...CollectionFull
			}
			to {
				...HoopFull
			}
		}
	}
	${HOOP_FULL_FRAGMENT}
	${COLLECTION_FULL_FRAGMENT}
`;

export const MERGE_COLLECTION_HOOPS = gql`
	mutation mergeCollectionHoops(
		$collectionId: ID!,
		$hoopId: ID!
	) {
		MergeCollectionHoops(
			from: { id: $collectionId }
			to: { id: $hoopId }
		) {
			from {
				...CollectionFull
			}
			to {
				...HoopFull
			}
		}
	}
	${HOOP_FULL_FRAGMENT}
	${COLLECTION_FULL_FRAGMENT}
`;

export const REMOVE_COLLECTION_HOOPS = gql`
	mutation removeCollectionHoops(
		$collectionId: ID!,
		$hoopId: ID!
	) {
		RemoveCollectionHoops(
			from: { id: $collectionId }
			to: { id: $hoopId }
		) {
			from {
				...CollectionFull
			}
			to {
				...HoopFull
			}
		}
	}
	${HOOP_FULL_FRAGMENT}
	${COLLECTION_FULL_FRAGMENT}
`;
