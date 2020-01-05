import gql from "graphql-tag";
import {
	COLLECTION_FULL_FRAGMENT,
	HOOP_FULL_FRAGMENT,
} from "./fragments";

export const GET_HOOPS = gql`
    query getHoops {
        Hoop {
            ...HoopFull
        }
    }
    ${HOOP_FULL_FRAGMENT}
`;

export const GET_HOOP = gql`
    query getHoop($id: ID!) {
        Hoop(id: $id) {
            ...HoopFull
        }
    }
    ${HOOP_FULL_FRAGMENT}
`;

export const GET_COLLECTIONS = gql`
    query getCollections {
        Collection {
            ...CollectionFull
        }
    }
    ${COLLECTION_FULL_FRAGMENT}
`;

export const GET_COLLECTION = gql`
    query getCollection($id: ID!) {
        Collection {
            ...CollectionFull
        }
    }
    ${COLLECTION_FULL_FRAGMENT}
`;
