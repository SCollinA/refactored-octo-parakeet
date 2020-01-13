import gql from "graphql-tag";
import {
	COLLECTION_FULL_FRAGMENT,
	HOOP_FULL_FRAGMENT,
} from "./fragments";

const RequiredId = `
	$id: ID!,
`;

const OptionalId = `
	$id: ID,
`;

const CollectionInputParams = `
	$name: String,
`;
const CollectionInputArgs = `
	id: $id,
	name: $name,
`;

const HoopInputParams = `
	$title: String,
	$description: String,
	$diameter: Float,
	$image: String,
	$price: Float,
	$sold: Boolean,
`;
const HoopInputArgs = `
	id: $id,
	title: $title,
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
	mutation createCollection(${OptionalId}${CollectionInputParams}) {
		CreateCollection(${CollectionInputArgs}) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const MERGE_COLLECTION = gql`
	mutation mergeCollection(${OptionalId}${CollectionInputParams}) {
		MergeCollection(${CollectionInputArgs}) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const UPDATE_COLLECTION = gql`
	mutation updateCollection(${RequiredId}${CollectionInputParams}) {
		UpdateCollection(${CollectionInputArgs}) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const DELETE_COLLECTION = gql`
	mutation deleteCollection(${RequiredId}) {
		DeleteCollection(id: $id) {
			...CollectionFull
		}
	}
	${COLLECTION_FULL_FRAGMENT}
`;

export const CREATE_HOOP = gql`
	mutation createHoop(${OptionalId}${HoopInputParams}) {
		CreateHoop(${HoopInputArgs}) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
`;

export const MERGE_HOOP = gql`
	mutation mergeHoop(${OptionalId}${HoopInputParams}) {
		MergeHoop(${HoopInputArgs}) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
`;

export const UPDATE_HOOP = gql`
	mutation updateHoop(${RequiredId}${HoopInputParams}) {
		UpdateHoop(${HoopInputArgs}) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
`;

export const DELETE_HOOP = gql`
	mutation deleteHoop(${RequiredId}) {
		DeleteHoop(id: $id) {
			...HoopFull
		}
	}
	${HOOP_FULL_FRAGMENT}
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
				hoops {
					...HoopFull
				}
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
