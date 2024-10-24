import { gql } from "@apollo/client";

export const GET_TRENDY_FILMS = gql`
  query TrendyFilms($limit: Float) {
    trendyFilms(limit: $limit) {
      posterPath
    }
  }
`;
