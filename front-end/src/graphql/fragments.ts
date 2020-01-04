import gql from "graphql-tag";

export const HOOP_BASIC_FRAGMENT = gql`
    fragment HoopBasic on Hoop {
        id
        name
        description
        size
        price
        sold
    }
`;

export const HOOP_WITH_IMAGE_FRAGMENT = gql`
    fragment HoopWithImage on Hoop {
        ...HoopBasic
        image
    }
    ${HOOP_BASIC_FRAGMENT}
`;

export const COLLECTION_NO_HOOPS_FRAGMENT = gql`
    fragment CollectionNoHoops on Collection {
        id
        name
    }
`;

export const HOOP_FULL_FRAGMENT = gql`
    fragment HoopFull on Hoop {
        ...HoopWithImage
        collections {
            ...CollectionNoHoops
        }
    }
    ${HOOP_WITH_IMAGE_FRAGMENT}
    ${COLLECTION_NO_HOOPS_FRAGMENT}
`;

export const COLLECTION_FULL_FRAGMENT = gql`
    fragment CollectionFull on Collection {
        ...CollectionNoHoops
        hoops {
            ...HoopWithImage
        }
    }
    ${HOOP_WITH_IMAGE_FRAGMENT}
    ${COLLECTION_NO_HOOPS_FRAGMENT}
`;
