import gql from "graphql-tag";
import {
    COLLECTION_FULL_FRAGMENT,
    HOOP_FULL_FRAGMENT
} from "./fragments";

export const LOGIN = gql`
    mutation login($password: String!) {
        login(password: $password) {
            token
        }
    }
`;
  
export const CREATE_COLLECTION = gql`
    mutation createCollection($collectionInput: CollectionInput!) {
        CreateCollection($collectionInput) {
            ...CollectionFull
        }
    }
    ${COLLECTION_FULL_FRAGMENT}
`;

export const MERGE_COLLECTION = gql`
    mutation mergeCollection($collectionInput: CollectionInput!) {
        MergeCollection($collectionInput) {
            ...CollectionFull
        }
    }
`;

export const UPDATE_COLLECTION = gql`
    mutation updateCollection($collectionInput: CollectionInput!) {
        UpdateCollection($collectionInput) {
            ...CollectionFull
        }
    }
`;

export const DELETE_COLLECTION = gql`
    mutation deleteCollection($id: ID!) {
        DeleteCollection(id: $id) {
            id
        }
    }
`;

export const CREATE_HOOP = gql`
    mutation createHoop($hoopInput: HoopInput!) {
        CreateHoop($hoopInput) {
            ...HoopFull
        }
    }
    ${HOOP_FULL_FRAGMENT}
`;

export const MERGE_HOOP = gql`
    mutation mergeHoop($hoopInput: HoopInput!) {
        MergeHoop($hoopInput) {
            ...HoopFull
        }
    }
`;

export const UPDATE_HOOP = gql`
    mutation updateHoop($hoopInput: HoopInput!) {
        UpdateHoop($hoopInput) {
            ...HoopFull
        }
    }
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
`;
