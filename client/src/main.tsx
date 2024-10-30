import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/connection.ts";
import App from "./App.tsx";
import HomePage from "./pages/HomePage.tsx";
import FilmDetail from "./pages/PageFilmDetail.tsx";

import "./index.css";

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
        path: "/film/:id",
        element: <FilmDetail />,
      },
      // Ajouter ici les objets pour le routing via l'outlet du App. {path:... , element:...}
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
