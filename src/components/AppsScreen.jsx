import React, { useState, useContext, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import { Link } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import iconConfig from "./iconConfig";
import { useTranslation } from "react-i18next";
import WidgetBinance from "./WidgetBinance.jsx";
import WidgetStocks from "./WidgetStocks.jsx";
import "../styles/widget.css";
import axios from "axios";

const AppsScreen = () => {
  const [isFirstPage, setIsFirstPage] = useState(true);
  const [isSlided] = useContext(PageContext);

  const { t } = useTranslation();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log(
        "Ei, estou contando com seu comentário no Feedback App! Thanks!"
      );
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);
  function apps(app, appName) {
    return (
      <div>
        <div className="img-hover">
          <img src={app} alt={app} />
        </div>
        {appName === "memory game" &&
        localStorage.getItem("language") === "ptBR" ? (
          <p
            style={{ fontSize: "10px", marginTop: "2px" }}
            className="apps-text"
          >
            {t(appName)}
          </p>
        ) : (
          <p className="apps-text">{t(appName)}</p>
        )}
      </div>
    );
  }

  const handleClickPages = () => {
    setIsFirstPage(!isFirstPage);
  };

  const handleGoogleMapsClick = () => {
    clickCounter("googleMaps");
    window.location.reload();
    window.location.href = "/Google-Maps";
  };

  const clickCounter = (app) => {
    axios
      .post("http://localhost:5000/clicks", {
        appName: app,
      })
      .then((res) => {
        if (app === "instagram" || app === "github" || app === "linkedin") {
          return;
        } else if (app === "spotify" || app === "Memory Game") {
          return;
        } else {
          window.location.href = `/${app}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="apps-screen">
      <div
        onClick={handleClickPages}
        className={`apps ${isSlided ? "slide3" : "slide"}`}
        id="APPS"
      >
        <div className="apps-line">
          <Link
            onClick={(event) => {
              clickCounter("mail");
            }}
            to={"/Mail"}
          >
            {apps(iconConfig.mailApp, "mail")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("calendar");
            }}
            to={"/Calendar"}
          >
            <CalendarApp />
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("photos");
            }}
            to={"/Photos"}
          >
            {apps(iconConfig.photosApp, "photos")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("camera");
            }}
            to={"/Camera"}
          >
            {apps(iconConfig.cameraApp, "camera")}
          </Link>
        </div>
        <div className="apps-line">
          <Link
            onClick={(event) => {
              clickCounter("facetime");
            }}
            to={"/FaceTime"}
          >
            {apps(iconConfig.facetimeApp, "FaceTime")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("clock");
            }}
            to={"/Clock"}
          >
            {apps(iconConfig.clockApp, "clock")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("weather");
            }}
            to={"/Weather"}
          >
            {apps(iconConfig.weatherApp, "weather")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("reminders");
            }}
            to={"/Reminders"}
          >
            {apps(iconConfig.remindersApp, "reminders")}
          </Link>
        </div>
        <div className="apps-line">
          <Link
            to={"/Notes"}
            onClick={(event) => {
              clickCounter("notes");
            }}
          >
            {apps(iconConfig.notesApp, "notes")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("stocks");
            }}
            to={"/Stocks"}
          >
            {apps(iconConfig.stocksApp, "stocks")}
          </Link>
          <Link
            onClick={(event) => {
              clickCounter("appStore");
            }}
            to={"/AppStore"}
          >
            {apps(iconConfig.appStoreApp, "App Store")}
          </Link>
          <Link
            onClick={() => {
              clickCounter("feedback");
            }}
            to={"/Feedback"}
          >
            {apps(iconConfig.feedbackApp, "Feedback")}
          </Link>
        </div>
        <div className="apps-line">
          <Link
            onClick={(event) => {
              clickCounter("calculator");
            }}
            to={"/Calculator"}
          >
            {apps(iconConfig.calculatorApp, "calculator")}
          </Link>
          <div onClick={handleGoogleMapsClick}>
            {apps(iconConfig.googleMapsApp, "Google Maps")}
          </div>
          <Link onClick={(event) => clickCounter("contacts")} to={"/Contacts"}>
            {apps(iconConfig.contactsApp, "contacts")}
          </Link>
          <Link onClick={(event) => clickCounter("settings")} to={"/Settings"}>
            {apps(iconConfig.settingsApp, "settings")}
          </Link>
        </div>
        <div className="apps-line">
          <Link
            onClick={(event) => clickCounter("spotify")}
            to={"/Spotify/Peregrino"}
          >
            {apps(iconConfig.spotifyApp, "Spotify")}
          </Link>
          <Link
            onClick={(event) => clickCounter("linkedin")}
            target="_blank"
            to={"https://www.linkedin.com/in/raiffemoura/"}
          >
            {apps(iconConfig.linkedinApp, "LinkedIn")}
          </Link>
          <Link
            onClick={(event) => clickCounter("instagram")}
            target="_blank"
            to={"http://instagram.com/raiffemoura"}
          >
            {apps(iconConfig.instagramApp, "Instagram")}
          </Link>
          <Link
            onClick={(event) => clickCounter("github")}
            target="_blank"
            to={"https://github.com/raiffemoura"}
          >
            {apps(iconConfig.githubApp, "Github")}
          </Link>
        </div>
      </div>
      <div
        onClick={handleClickPages}
        className={`apps ${isSlided ? "slide4" : "slide2"}`}
        id="APPS2"
      >
        <div className="widget">
          <WidgetBinance />
        </div>
        <p className="apps-text">Binance</p>
        <div className="widget">
          <WidgetStocks />
        </div>
        <p className="apps-text">Stocks</p>

        <div className="apps-line">
          <Link
            onClick={(event) => clickCounter("ticTacToe")}
            to={"/ticTacToe"}
          >
            {apps(iconConfig.ticTacToeApp, "ticTacToe")}
          </Link>
          <Link
            onClick={(event) => clickCounter("memoryGame")}
            to={"/memoryGame"}
          >
            {apps(iconConfig.memoryGameApp, "memory game")}
          </Link>

          <Link onClick={(event) => clickCounter("resizer")} to={"/resizer"}>
            {apps(iconConfig.resizerApp, "resizer")}
          </Link>
        </div>
        <div className="apps-line-no-app"></div>
      </div>
    </div>
  );
};

export default AppsScreen;
