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

export type Avatar = {
  __typename?: 'Avatar';
  id: Scalars['ID']['output'];
  image: Scalars['String']['output'];
};

export type AvatarInput = {
  image: Scalars['String']['input'];
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
  id: Scalars['ID']['output'];
  originalLanguage?: Maybe<Scalars['String']['output']>;
  overview?: Maybe<Scalars['String']['output']>;
  popularity: Scalars['Float']['output'];
  posterPath?: Maybe<Scalars['String']['output']>;
  releaseDate: Scalars['String']['output'];
  title: Scalars['String']['output'];
  tmdbId?: Maybe<Scalars['Float']['output']>;
  voteAverage: Scalars['Float']['output'];
  voteCount: Scalars['Float']['output'];
};

export type GetUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type GetUserOutput = {
  __typename?: 'GetUserOutput';
  email: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAvatar: Scalars['Float']['output'];
  signUp: Scalars['String']['output'];
};


export type MutationCreateAvatarArgs = {
  body: AvatarInput;
};


export type MutationSignUpArgs = {
  body: NewUserInput;
};

export type NewUserInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getFilmById?: Maybe<Film>;
  getUserByEmail?: Maybe<User>;
  lastFilms?: Maybe<Array<Film>>;
  searchFilms: Array<Film>;
  signIn: GetUserOutput;
  trendyFilms?: Maybe<Array<Film>>;
};


export type QueryGetFilmByIdArgs = {
  id: Scalars['Int']['input'];
};


export type QueryGetUserByEmailArgs = {
  email: Scalars['String']['input'];
};


export type QueryLastFilmsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};


export type QuerySearchFilmsArgs = {
  searchBy: Criteria;
  searchTerm: Scalars['String']['input'];
};


export type QuerySignInArgs = {
  body: GetUserInput;
};


export type QueryTrendyFilmsArgs = {
  limit?: InputMaybe<Scalars['Float']['input']>;
};

export type User = {
  __typename?: 'User';
  avatar: Avatar;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  password: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type SignUpMutationVariables = Exact<{
  body: NewUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: string };

export type GetUserByEmailQueryVariables = Exact<{
  email: Scalars['String']['input'];
}>;


export type GetUserByEmailQuery = { __typename?: 'Query', getUserByEmail?: { __typename?: 'User', id: string, username: string, email: string, password: string, avatar: { __typename?: 'Avatar', id: string, image: string } } | null };

export type SignInQueryVariables = Exact<{
  body: GetUserInput;
}>;


export type SignInQuery = { __typename?: 'Query', signIn: { __typename?: 'GetUserOutput', email: string, username: string } };

export type LastFilmsQueryVariables = Exact<{ [key: string]: never; }>;


export type LastFilmsQuery = { __typename?: 'Query', lastFilms?: Array<{ __typename?: 'Film', id: string, posterPath?: string | null, title: string }> | null };

export type TrendyFilmsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Float']['input']>;
}>;


export type TrendyFilmsQuery = { __typename?: 'Query', trendyFilms?: Array<{ __typename?: 'Film', id: string, posterPath?: string | null, title: string }> | null };

export type SearchFilmsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
  searchBy: Criteria;
}>;


export type SearchFilmsQuery = { __typename?: 'Query', searchFilms: Array<{ __typename?: 'Film', id: string, title: string, releaseDate: string, popularity: number, posterPath?: string | null, voteAverage: number, voteCount: number, overview?: string | null, originalLanguage?: string | null, director?: string | null, actors?: string | null }> };

export type GetFilmByIdQueryVariables = Exact<{
  getFilmByIdId: Scalars['Int']['input'];
}>;


export type GetFilmByIdQuery = { __typename?: 'Query', getFilmById?: { __typename?: 'Film', actors?: string | null, director?: string | null, id: string, originalLanguage?: string | null, overview?: string | null, popularity: number, posterPath?: string | null, releaseDate: string, title: string } | null };


export const SignUpDocument = gql`
    mutation SignUp($body: NewUserInput!) {
  signUp(body: $body)
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const GetUserByEmailDocument = gql`
    query getUserByEmail($email: String!) {
  getUserByEmail(email: $email) {
    id
    username
    email
    password
    avatar {
      id
      image
    }
  }
}
    `;

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables> & ({ variables: GetUserByEmailQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
      }
export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export function useGetUserByEmailSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options);
        }
export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailSuspenseQueryHookResult = ReturnType<typeof useGetUserByEmailSuspenseQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
export const SignInDocument = gql`
    query SignIn($body: GetUserInput!) {
  signIn(body: $body) {
    email
    username
  }
}
    `;

/**
 * __useSignInQuery__
 *
 * To run a query within a React component, call `useSignInQuery` and pass it any options that fit your needs.
 * When your component renders, `useSignInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSignInQuery({
 *   variables: {
 *      body: // value for 'body'
 *   },
 * });
 */
export function useSignInQuery(baseOptions: Apollo.QueryHookOptions<SignInQuery, SignInQueryVariables> & ({ variables: SignInQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
      }
export function useSignInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SignInQuery, SignInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
        }
export function useSignInSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<SignInQuery, SignInQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<SignInQuery, SignInQueryVariables>(SignInDocument, options);
        }
export type SignInQueryHookResult = ReturnType<typeof useSignInQuery>;
export type SignInLazyQueryHookResult = ReturnType<typeof useSignInLazyQuery>;
export type SignInSuspenseQueryHookResult = ReturnType<typeof useSignInSuspenseQuery>;
export type SignInQueryResult = Apollo.QueryResult<SignInQuery, SignInQueryVariables>;
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
export const GetFilmByIdDocument = gql`
    query GetFilmById($getFilmByIdId: Int!) {
  getFilmById(id: $getFilmByIdId) {
    actors
    director
    id
    originalLanguage
    overview
    popularity
    posterPath
    releaseDate
    title
  }
}
    `;

/**
 * __useGetFilmByIdQuery__
 *
 * To run a query within a React component, call `useGetFilmByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilmByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilmByIdQuery({
 *   variables: {
 *      getFilmByIdId: // value for 'getFilmByIdId'
 *   },
 * });
 */
export function useGetFilmByIdQuery(baseOptions: Apollo.QueryHookOptions<GetFilmByIdQuery, GetFilmByIdQueryVariables> & ({ variables: GetFilmByIdQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilmByIdQuery, GetFilmByIdQueryVariables>(GetFilmByIdDocument, options);
      }
export function useGetFilmByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilmByIdQuery, GetFilmByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilmByIdQuery, GetFilmByIdQueryVariables>(GetFilmByIdDocument, options);
        }
export function useGetFilmByIdSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<GetFilmByIdQuery, GetFilmByIdQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilmByIdQuery, GetFilmByIdQueryVariables>(GetFilmByIdDocument, options);
        }
export type GetFilmByIdQueryHookResult = ReturnType<typeof useGetFilmByIdQuery>;
export type GetFilmByIdLazyQueryHookResult = ReturnType<typeof useGetFilmByIdLazyQuery>;
export type GetFilmByIdSuspenseQueryHookResult = ReturnType<typeof useGetFilmByIdSuspenseQuery>;
export type GetFilmByIdQueryResult = Apollo.QueryResult<GetFilmByIdQuery, GetFilmByIdQueryVariables>;