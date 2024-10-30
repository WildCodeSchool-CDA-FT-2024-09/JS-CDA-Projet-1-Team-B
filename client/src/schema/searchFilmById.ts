import { gql } from "@apollo/client";

export const GET_FILM_BY_ID = gql`
  query GetFilmById($getFilmByIdId: Int!) {
    getFilmById(id: $getFilmByIdId) {
      actors
      director
      id
      originalLanguage
      overview
      popularity
      posterPath
      releaseDate
      title
    }
  }
`;
