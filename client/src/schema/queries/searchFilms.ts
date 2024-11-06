import { gql } from "@apollo/client";

export const SEARCH_FILMS = gql`
  query SearchFilms(
    $searchTerm: String!
    $searchBy: Criteria!
    $category: Int!
  ) {
    searchFilms(
      searchTerm: $searchTerm
      searchBy: $searchBy
      category: $category
    ) {
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
      categories {
        id
        name
      }
    }
  }
`;
