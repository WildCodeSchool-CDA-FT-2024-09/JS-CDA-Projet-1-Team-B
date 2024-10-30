import { gql } from "@apollo/client";

export const GET_FILM_BY_ID = gql`
  query GetFilmById($id: Int!) {
    getFilmById(id: $id) {
      id
      title
      overview
      releaseDate
      popularity
      voteAverage
      voteCount
      posterPath
      originalLanguage
      actors
      director
    }
  }
`;
