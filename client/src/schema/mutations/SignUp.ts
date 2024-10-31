import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp($body: NewUserInput!) {
    signUp(body: $body)
  }
`;
