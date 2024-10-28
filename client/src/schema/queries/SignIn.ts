import { gql } from "@apollo/client";

export const signIn = gql`
  query GetOneUser($body: GetUserInput!) {
    getOneUser(body: $body) {
      username
      email
    }
  }
`;
