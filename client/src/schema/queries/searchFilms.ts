import { gql } from "@apollo/client";

export const SEARCH_FILMS = gql`
  query SearchFilms($title: String!) {
    searchFilms(title: $title) {
      id
      title
      releaseDate
      popularity
      posterPath
      voteAverage
      voteCount
      overview
      originalLanguage
      director
      actors
    }
  }
`;
