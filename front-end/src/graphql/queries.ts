import gql from "graphql-tag";
import {
	COLLECTION_FULL_FRAGMENT,
	HOOP_BASIC_FRAGMENT,
	HOOP_FULL_FRAGMENT,
	HOOP_WITH_IMAGE_FRAGMENT,
} from "./fragments";

export const GET_HOOPS_FULL = gql`
    query getHoops {
        Hoop {
            ...HoopFull
        }
    }
    ${HOOP_FULL_FRAGMENT}
`;

export const GET_HOOP_FULL = gql`
    query getHoop($id: ID!) {
        Hoop(id: $id) {
            ...HoopFull
        }
    }
    ${HOOP_FULL_FRAGMENT}
`;

export const GET_HOOPS_BASIC = gql`
    query getHoops {
        Hoop {
            ...HoopBasic
        }
    }
    ${HOOP_BASIC_FRAGMENT}
`;

export const GET_HOOP_BASIC = gql`
    query getHoop($id: ID!) {
        Hoop(id: $id) {
            ...HoopBasic
        }
    }
    ${HOOP_BASIC_FRAGMENT}
`;

export const GET_HOOPS_WITH_IMAGE = gql`
    query getHoops {
        Hoop {
            ...HoopWithImage
        }
    }
    ${HOOP_WITH_IMAGE_FRAGMENT}
`;

export const GET_HOOP_WITH_IMAGE = gql`
    query getHoop($id: ID!) {
        Hoop(id: $id) {
            ...HoopWithImage
        }
    }
    ${HOOP_WITH_IMAGE_FRAGMENT}
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
        Collection(id: $id) {
            ...CollectionFull
        }
    }
    ${COLLECTION_FULL_FRAGMENT}
`;
