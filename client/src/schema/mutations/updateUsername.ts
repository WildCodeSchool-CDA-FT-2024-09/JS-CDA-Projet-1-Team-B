import { gql } from "@apollo/client";

export const UPDATE_USERNAME = gql`
    mutation UpdateUsername($body: updateUsernameInput!) {
        updateUsername(body: $body) {
            id
            username
            email
            avatar {
                id
                image
            }
        }
    }
`;
