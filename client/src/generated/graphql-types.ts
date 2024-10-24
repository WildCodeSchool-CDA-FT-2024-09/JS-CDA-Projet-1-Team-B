import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Film = {
  __typename?: 'Film';
  actors: Scalars['String']['output'];
  director: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  originalLanguage: Scalars['String']['output'];
  overview: Scalars['String']['output'];
  popularity: Scalars['Float']['output'];
  posterPath: Scalars['String']['output'];
  releaseDate: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tmdbId: Scalars['Float']['output'];
  voteAverage: Scalars['Float']['output'];
  voteCount: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  searchFilms: Array<Film>;
};


export type QuerySearchFilmsArgs = {
  title?: InputMaybe<Scalars['String']['input']>;
};

export type SearchFilmsQueryVariables = Exact<{
  title: Scalars['String']['input'];
}>;


export type SearchFilmsQuery = { __typename?: 'Query', searchFilms: Array<{ __typename?: 'Film', id: number, title: string, releaseDate: string, popularity: number, posterPath: string, voteAverage: number, voteCount: number, overview: string, originalLanguage: string, director: string, actors: string }> };


export const SearchFilmsDocument = gql`
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

/**
 * __useSearchFilmsQuery__
 *
 * To run a query within a React component, call `useSearchFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSearchFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSearchFilmsQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useSearchFilmsQuery(baseOptions: Apollo.QueryHookOptions<SearchFilmsQuery, SearchFilmsQueryVariables> & ({ variables: SearchFilmsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SearchFilmsQuery, SearchFilmsQueryVariables>(SearchFilmsDocument, options);
      }
export function useSearchFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SearchFilmsQuery, SearchFilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SearchFilmsQuery, SearchFilmsQueryVariables>(SearchFilmsDocument, options);
        }
export function useSearchFilmsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SearchFilmsQuery, SearchFilmsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SearchFilmsQuery, SearchFilmsQueryVariables>(SearchFilmsDocument, options);
        }
export type SearchFilmsQueryHookResult = ReturnType<typeof useSearchFilmsQuery>;
export type SearchFilmsLazyQueryHookResult = ReturnType<typeof useSearchFilmsLazyQuery>;
export type SearchFilmsSuspenseQueryHookResult = ReturnType<typeof useSearchFilmsSuspenseQuery>;
export type SearchFilmsQueryResult = Apollo.QueryResult<SearchFilmsQuery, SearchFilmsQueryVariables>;