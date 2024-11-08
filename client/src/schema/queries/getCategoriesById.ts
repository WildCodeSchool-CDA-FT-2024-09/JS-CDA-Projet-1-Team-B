import { gql } from "@apollo/client";

export const GET_CATEGORY_BY_ID = gql`
  query GetCategoryById($id: Int!) {
    getCategoryById(id: $id) {
      id
      name
    }
  }
`;
