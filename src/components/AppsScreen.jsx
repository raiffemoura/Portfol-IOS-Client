import React, { useState, useContext, useEffect } from "react";
import { PageContext } from "../context/PageContext";
import { Link } from "react-router-dom";
import CalendarApp from "./CalendarApp";
import iconConfig from "./iconConfig";
import { useTranslation } from "react-i18next";
import WidgetBinance from "./WidgetBinance.jsx";
import WidgetStocks from "./WidgetStocks.jsx";
import "../styles/widget.css";

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

  /*const handleClickPages = () => {
    setIsFirstPage(!isFirstPage);
  };

  const handleGoogleMapsClick = () => {
   
    window.location.reload();
    window.location.href = '/Google-Maps';
  };

  const clickCounter = (app) => {
    axios
      .post('http://localhost:5000/clicks', {
      .post('http://localhost:5000/clicks', {
        appName: app,
      })
      .then((res) => {
        if (app === 'instagram' || app === 'github' || app === 'linkedin') {
        if (app === 'instagram' || app === 'github' || app === 'linkedin') {
          return;
        } else if (app === 'spotify' || app === 'Memory Game') {
        } else if (app === 'spotify' || app === 'Memory Game') {
          return;
        } else {
          window.location.href = `/${app}`;
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };*/

  return (
    <div className="apps-screen">
      <div className={`apps ${isSlided ? "slide3" : "slide"}`} id="APPS">
        <div className="apps-line">
          <Link to={"/Mail"}>{apps(iconConfig.mailApp, "mail")}</Link>
          <Link to={"/Calendar"}>
            <CalendarApp />
          </Link>
          <Link to={"/Photos"}>{apps(iconConfig.photosApp, "photos")}</Link>
          <Link to={"/Camera"}>{apps(iconConfig.cameraApp, "camera")}</Link>
        </div>
        <div className="apps-line">
          <Link to={"/FaceTime"}>
            {apps(iconConfig.facetimeApp, "FaceTime")}
          </Link>
          <Link to={"/Clock"}>{apps(iconConfig.clockApp, "clock")}</Link>
          <Link to={"/Weather"}>{apps(iconConfig.weatherApp, "weather")}</Link>
          <Link to={"/Reminders"}>
            {apps(iconConfig.remindersApp, "reminders")}
          </Link>
        </div>
        <div className="apps-line">
          <Link to={"/Notes"}>{apps(iconConfig.notesApp, "notes")}</Link>
          <Link to={"/Stocks"}>{apps(iconConfig.stocksApp, "stocks")}</Link>
          <Link to={"/AppStore"}>
            {apps(iconConfig.appStoreApp, "App Store")}
          </Link>
          <Link to={"/Calculator"}>
            {apps(iconConfig.calculatorApp, "calculator")}
          </Link>

          {/*<Link
            
            to={"/Feedback"}
          >
            {apps(iconConfig.feedbackApp, "Feedback")}
          </Link>
          </Link>*/}
        </div>

        <div className="apps-line">
          <Link to={"/memoryGame"}>
            {apps(iconConfig.memoryGameApp, "memory game")}
          </Link>

          <Link to={"/ticTacToe"}>
            {apps(iconConfig.ticTacToeApp, "ticTacToe")}
          </Link>

          {/*<div onClick={handleGoogleMapsClick}>
            {apps(iconConfig.googleMapsApp, 'Google Maps')}
          </div>*/}
          <Link to={"/Contacts"}>
            {apps(iconConfig.contactsApp, "contacts")}
          </Link>
          <Link to={"/Settings"}>
            {apps(iconConfig.settingsApp, "settings")}
          </Link>
        </div>

        <div className="apps-line">
          {/*<Link to={"/Spotify/Peregrino"}>
            {apps(iconConfig.spotifyApp, "Spotify")}
          </Link> */}
          <Link target="_blank" to={"https://www.linkedin.com/in/raiffemoura/"}>
            {apps(iconConfig.linkedinApp, "LinkedIn")}
          </Link>
          <Link target="_blank" to={"http://instagram.com/raiffemoura"}>
            {apps(iconConfig.instagramApp, "Instagram")}
          </Link>
          <Link target="_blank" to={"https://github.com/raiffemoura"}>
            {apps(iconConfig.githubApp, "Github")}
          </Link>
          <div className="app-space"></div>
        </div>
      </div>
      <div className={`apps ${isSlided ? "slide4" : "slide2"}`} id="APPS2">
        <div className="widget">
          <WidgetBinance />
        </div>
        <p className="apps-text">Binance</p>
        <div className="widget">
          <WidgetStocks />
        </div>
        <p className="apps-text">Stocks</p>

        <div className="apps-line">
          {/*<Link
           
            to={'/ticTacToe'}
          >
            {apps(iconConfig.ticTacToeApp, 'ticTacToe')}
            {apps(iconConfig.ticTacToeApp, 'ticTacToe')}
          </Link>
          <Link
           }
            to={'/memoryGame'}
          >
            {apps(iconConfig.memoryGameApp, 'memory game')}
            {apps(iconConfig.memoryGameApp, 'memory game')}
          </Link>

          <Link  to={'/resizer'}>
            {apps(iconConfig.resizerApp, 'resizer')}
          </Link>*/}
        </div>
        <div className="apps-line-no-app"></div>
      </div>
    </div>
  );
};

export default AppsScreen;
