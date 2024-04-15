import React from "react";
import ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import ErrorPage from "./routes/ErrorPage";
import Calculator from "./routes/Calculator";
import Peregrino from "./routes/spotify/Peregrino";
import SpotifyAboutAlessandro from "./routes/spotify/SpotifyAboutAlessandro";
import Umacoisa from "./routes/spotify/UmaCoisa";
import SpotifyAboutMorada from "./routes/spotify/SpotifyAboutMorada";
import Contacts from "./routes/Contacts";
import GoogleMaps from "./routes/GoogleMaps";
import NotesPage from "./routes/NotesPage";
import Feedback from "./routes/Feedback";
import FeedbackAdd from "./components/feedback/FeedbackAdd";
import FeedbackStatistics from "./components/feedback/FeedbackStatistics";
import FeedbackClicks from "./components/feedback/FeedbackClicks.jsx";
import Stocks from "./routes/Stocks";
import Settings from "./routes/Settings";
import Weather from "./routes/Weather";
import MemoryGame from "./routes/MemoryGame";
import Photos from "./routes/Photos";
import Mail from "./routes/Mail";
import Reminders from "./routes/Reminders";
import Clock from "./routes/Clock.jsx";
import Camera from "./routes/Camera";
import Facetime from "./routes/Facetime";
import TicTacToe from "./routes/TicTacToe";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/Calculator",
    element: <Calculator />,
  },
  {
    path: "/Spotify/Peregrino",
    element: <Peregrino />,
  },
  {
    path: "/Spotify/Alessandro-Vilas-Boas",
    element: <SpotifyAboutAlessandro />,
  },
  {
    path: "/Spotify/uma-coisa",
    element: <Umacoisa />,
  },
  {
    path: "/Spotify/MORADA",
    element: <SpotifyAboutMorada />,
  },
  {
    path: "/Contacts",
    element: <Contacts />,
  },
  {
    path: "/phone",
    element: <Contacts />,
  },
  {
    path: "/google-maps",
    element: <GoogleMaps />,
  },
  {
    path: "/Notes",
    element: <NotesPage />,
  },
  {
    path: "/feedback",
    element: <Feedback />,
  },
  {
    path: "/thanks-for-your-feedback",
    element: <FeedbackAdd />,
  },
  {
    path: "/statistics",
    element: <FeedbackStatistics />,
  },
  {
    path: "/clicks",
    element: <FeedbackClicks />,
  },
  {
    path: "/stocks",
    element: <Stocks />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/weather",
    element: <Weather />,
  },
  {
    path: "/Memorygame",
    element: <MemoryGame />,
  },
  {
    path: "/photos",
    element: <Photos />,
  },
  {
    path: "/mail",
    element: <Mail />,
  },
  {
    path: "/reminders",
    element: <Reminders />,
  },
  {
    path: "/clock",
    element: <Clock />,
  },
  {
    path: "/camera",
    element: <Camera />,
  },
  {
    path: "/facetime",
    element: <Facetime />,
  },
  {
    path: "/TicTacToe",
    element: <TicTacToe />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
