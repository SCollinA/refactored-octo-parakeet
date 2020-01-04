import gql from "graphql-tag";
import {
    COLLECTION_FULL_FRAGMENT,
    HOOP_FULL_FRAGMENT
} from "./fragments";

export const LOGIN = gql`
    mutation login {
        login(password: "herro")
    }
`;
  
export const CREATE_COLLECTION = gql`
    mutation createCollection {
        CreateCollection {
            ...CollectionFull
        }
    }
    ${COLLECTION_FULL_FRAGMENT}
`;
  
export const CREATE_HOOP = gql`
    mutation createHoop {
        CreateHoop {
            ...HoopFull
        }
    }
    ${HOOP_FULL_FRAGMENT}
`;
  