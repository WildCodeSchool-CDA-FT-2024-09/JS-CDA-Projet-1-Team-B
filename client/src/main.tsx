import { StrictMode } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client";
import { client } from "./services/connection.ts";
import App from "./App.tsx";
import AboutPage from "./pages/AboutPage.tsx";
import Profile from "./pages/Profile.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import FilmDetail from "./pages/PageFilmDetail.tsx";
import SignUp from "./components/SignUp.tsx";
import SignIn from "./components/SignIn.tsx";
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
        path: "/faq",
        element: <FAQPage />,
      },
      {
        path: "/films/:id",
        element: <FilmDetail />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      },
      { path: "inscription", element: <SignUp /> },
      { path: "connexion", element: <SignIn /> },
      { path: "profil", element: <Profile /> },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ApolloProvider client={client}>
      <RouterProvider router={router} />
    </ApolloProvider>
  </StrictMode>,
);
