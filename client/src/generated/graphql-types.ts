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

/** Les critères de recherche... */
export enum Criteria {
  Actor = 'actor',
  Director = 'director',
  Title = 'title'
}

export type Film = {
  __typename?: 'Film';
  actors?: Maybe<Scalars['String']['output']>;
  director?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  originalLanguage?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity: Scalars['Float']['output'];
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate: Scalars['String']['output'];
  title: Scalars['String']['output'];
  voteAverage: Scalars['Float']['output'];
  voteCount: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  searchFilms: Array<Film>;
  trendyFilms?: Maybe<Array<Film>>;
};


export type QuerySearchFilmsArgs = {
  searchBy: Criteria;
  searchTerm: Scalars['String']['input'];
};


export type QueryTrendyFilmsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type TrendyFilmsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type TrendyFilmsQuery = { __typename?: 'Query', trendyFilms?: Array<{ __typename?: 'Film', posterPath?: string | null, title: string }> | null };

export type SearchFilmsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  searchBy: Criteria;
}>;


export type SearchFilmsQuery = { __typename?: 'Query', searchFilms: Array<{ __typename?: 'Film', id: number, title: string, releaseDate: string, popularity: number, posterPath?: string | null, voteAverage: number, voteCount: number, overview?: string | null, originalLanguage?: string | null, director?: string | null, actors?: string | null }> };


export const TrendyFilmsDocument = gql`
    query TrendyFilms($limit: Float) {
  trendyFilms(limit: $limit) {
    posterPath
    title
  }
}
    `;

/**
 * __useTrendyFilmsQuery__
 *
 * To run a query within a React component, call `useTrendyFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendyFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendyFilmsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useTrendyFilmsQuery(baseOptions?: Apollo.QueryHookOptions<TrendyFilmsQuery, TrendyFilmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TrendyFilmsQuery, TrendyFilmsQueryVariables>(TrendyFilmsDocument, options);
      }
export function useTrendyFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrendyFilmsQuery, TrendyFilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TrendyFilmsQuery, TrendyFilmsQueryVariables>(TrendyFilmsDocument, options);
        }
export function useTrendyFilmsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<TrendyFilmsQuery, TrendyFilmsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<TrendyFilmsQuery, TrendyFilmsQueryVariables>(TrendyFilmsDocument, options);
        }
export type TrendyFilmsQueryHookResult = ReturnType<typeof useTrendyFilmsQuery>;
export type TrendyFilmsLazyQueryHookResult = ReturnType<typeof useTrendyFilmsLazyQuery>;
export type TrendyFilmsSuspenseQueryHookResult = ReturnType<typeof useTrendyFilmsSuspenseQuery>;
export type TrendyFilmsQueryResult = Apollo.QueryResult<TrendyFilmsQuery, TrendyFilmsQueryVariables>;
export const SearchFilmsDocument = gql`
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
 *      searchTerm: // value for 'searchTerm'
 *      searchBy: // value for 'searchBy'
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