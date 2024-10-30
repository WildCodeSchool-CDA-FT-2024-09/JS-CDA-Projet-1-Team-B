import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/connection.ts";
import App from "./App.tsx";
import "./index.css";
import HomePage from "./pages/HomePage.tsx";

const router = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
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
