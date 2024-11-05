import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  query SignIn($body: GetUserInput!) {
    signIn(body: $body) {
      email
      username
    }
  }
`;
