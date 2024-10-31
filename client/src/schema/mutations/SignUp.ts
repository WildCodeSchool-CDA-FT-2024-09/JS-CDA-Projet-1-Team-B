import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation createUser($body: NewUserInput!) {
    createUser(body: $body)
  }
`;
