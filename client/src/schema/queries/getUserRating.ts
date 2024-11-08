import { gql } from "@apollo/client";

export const GET_USER_RATING = gql`query GetUserRating($getUserRatingId: Float!) {
    getUserRating(id: $getUserRatingId) {
        id
        rating
        film {
            id
            title
            releaseDate
            posterPath
        }
    }
}`;