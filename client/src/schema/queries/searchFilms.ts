import { gql } from "@apollo/client";

export const SEARCH_FILMS = gql`
  query searchFilms($title: String, $actorName: String, $director: String) {
    searchFilms(title: $title, actorName: $actorName, director: $director) {
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
