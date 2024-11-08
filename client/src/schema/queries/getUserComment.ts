import { gql } from "@apollo/client";

export const GET_USER_COMMENT = gql`query GetUserComment($getUserCommentId: Float!) {
    getUserComment(id: $getUserCommentId) {
        content
        created_at
        film {
            id
            title
            releaseDate
            posterPath
        }
    }
}`;