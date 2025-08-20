import "./index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home/Home.jsx";
import { LoginSignup } from "./pages/LoginSignup/LoginSignup.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorPage } from "./pages/ErrorPage/ErrorPage.jsx";
import { Login } from "./pages/Login/Login.jsx";
import { Signup } from "./pages/Signup/Signup.jsx";
import { Difficulty } from "./pages/Difficulty/Difficulty.jsx";
import { Game } from "./pages/GameUI/Game.jsx";
import { Ranking } from "./pages/Ranking/Ranking.jsx";
import { Details } from "./pages/Details/Details.jsx";
import UserContextProvider from "./context/UserContextProvider.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/LoginSignup",
    element: <LoginSignup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/difficulty",
    element: <Difficulty />,
  },
  {
    path: "/thegame",
    element: <Game />,
  },
  {
    path: "ranking",
    element: <Ranking />,
  },
  {
    path: "/details",
    element: <Details />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UserContextProvider>
      <RouterProvider router={router} />
    </UserContextProvider>
  </StrictMode>
);
