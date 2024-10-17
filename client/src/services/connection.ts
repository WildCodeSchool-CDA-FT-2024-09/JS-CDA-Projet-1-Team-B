import { ApolloClient, InMemoryCache } from "@apollo/client";
// import axios from "axios";

// // AXIOS INSTANCE
// export const instance = axios.create({
//   baseURL: import.meta.env.VITE_API_URL,
// });

// APOLLO CLIENT INSTANCE
export const client = new ApolloClient({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
  cache: new InMemoryCache(),
});
