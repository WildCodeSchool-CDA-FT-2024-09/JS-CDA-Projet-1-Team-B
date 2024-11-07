import { gql } from "@apollo/client";

export const GET_FRENCH_FILMS = gql`
  query FrenchFilms {
    FrenchFilms {
      id
      posterPath
      title
    }
  }
`;
