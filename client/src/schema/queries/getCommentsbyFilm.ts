import { gql } from "@apollo/client";

export const FILM_COMMENTS_QUERY = gql`
  query FilmComments($filmId: Int!) {
    filmComments(filmId: $filmId) {
      id
      content
      created_at
      updated_at
      user {
        username
        avatar {
          image
          id
        }
      }
    }
  }
`;
