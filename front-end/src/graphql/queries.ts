import gql from "graphql-tag";
import {
    HOOP_FULL_FRAGMENT,
    COLLECTION_FULL_FRAGMENT
} from "./fragments";

export const GET_HOOPS = gql`
    query getHoops {
        Hoop {
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
