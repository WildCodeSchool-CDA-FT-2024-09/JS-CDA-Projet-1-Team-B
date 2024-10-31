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
  lastFilms?: Maybe<Array<Film>>;
  trendyFilms?: Maybe<Array<Film>>;
};


export type QueryLastFilmsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QueryTrendyFilmsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type LastFilmsQueryVariables = Exact<{ [key: string]: never; }>;


export type LastFilmsQuery = { __typename?: 'Query', lastFilms?: Array<{ __typename?: 'Film', id: number, posterPath?: string | null, title: string }> | null };

export type TrendyFilmsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type TrendyFilmsQuery = { __typename?: 'Query', trendyFilms?: Array<{ __typename?: 'Film', id: number, posterPath?: string | null, title: string }> | null };


export const LastFilmsDocument = gql`
    query LastFilms {
  lastFilms {
    id
    posterPath
    title
  }
}
    `;

/**
 * __useLastFilmsQuery__
 *
 * To run a query within a React component, call `useLastFilmsQuery` and pass it any options that fit your needs.
 * When your component renders, `useLastFilmsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useLastFilmsQuery({
 *   variables: {
 *   },
 * });
 */
export function useLastFilmsQuery(baseOptions?: Apollo.QueryHookOptions<LastFilmsQuery, LastFilmsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<LastFilmsQuery, LastFilmsQueryVariables>(LastFilmsDocument, options);
      }
export function useLastFilmsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<LastFilmsQuery, LastFilmsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<LastFilmsQuery, LastFilmsQueryVariables>(LastFilmsDocument, options);
        }
export function useLastFilmsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<LastFilmsQuery, LastFilmsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<LastFilmsQuery, LastFilmsQueryVariables>(LastFilmsDocument, options);
        }
export type LastFilmsQueryHookResult = ReturnType<typeof useLastFilmsQuery>;
export type LastFilmsLazyQueryHookResult = ReturnType<typeof useLastFilmsLazyQuery>;
export type LastFilmsSuspenseQueryHookResult = ReturnType<typeof useLastFilmsSuspenseQuery>;
export type LastFilmsQueryResult = Apollo.QueryResult<LastFilmsQuery, LastFilmsQueryVariables>;
export const TrendyFilmsDocument = gql`
    query TrendyFilms($limit: Float) {
  trendyFilms(limit: $limit) {
    id
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