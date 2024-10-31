import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query getOneUser($body: GetUserInput!) {
    getOneUser(body: $body) {
      username
      email
    }
  }
`;
