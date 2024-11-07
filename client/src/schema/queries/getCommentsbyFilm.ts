import { gql } from "@apollo/client";

export const FILM_COMMENTS_QUERY = gql`
  query FilmComments($filmId: Int!) {
    filmComments(filmId: $filmId) {
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
