import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/connection.ts";
import "./index.css";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import FilmDetail from "./pages/PageFilmDetail.tsx";

import SignUp from "./components/SignUp.tsx";
import SignIn from "./components/SignIn.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/films/:id",
        element: <FilmDetail />,
      },
      { path: "inscription", element: <SignUp /> },
      { path: "connexion", element: <SignIn /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>
);
