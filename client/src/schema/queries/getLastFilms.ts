import { gql } from "@apollo/client";

export const GET_LAST_FILMS = gql`
  query LastFilms {
    lastFilms {
      id
      posterPath
      title
    }
  }
`;
