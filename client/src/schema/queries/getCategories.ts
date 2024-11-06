import { gql } from "@apollo/client";

export const GET_LAST_FILMS = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;
