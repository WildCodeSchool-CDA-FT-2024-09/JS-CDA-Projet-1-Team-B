import { gql } from "@apollo/client";

export const SEARCH_FILMS = gql`
  query SearchFilms($searchTerm: String!, $searchBy: Criteria!) {
    searchFilms(searchTerm: $searchTerm, searchBy: $searchBy) {
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
