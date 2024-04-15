import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import iconConfig from "../iconConfig";
import HeaderBlack from "../HeaderBlack";
import FeedbackFooter from "./FeedbackFooter";
import HomeButtonFeedback from "./HomeButtonFeedback";
import { useTranslation } from "react-i18next";

const FeedbackClicks = () => {
  const [clicks, setClicks] = useState([]);

  const { t } = useTranslation();

  useEffect(() => {
    const fetchClicks = async () => {
      try {
        const response = await axios.get("http://localhost:5000/clicks");
        const sortedClicks = response.data.sort((a, b) => {
          return b.clicks - a.clicks;
        });
        setClicks(sortedClicks);
      } catch (err) {
        console.log("Erro ao buscar clicks: " + err);
      }
    };
    fetchClicks();
  }, []);
  const listApps = (appName, clicks, id) => {
    return (
      <div key={id} className="clicks-box">
        <img src={iconConfig[`${appName}App`]} alt={appName} />

        <div className="clicks-name">
          <p>{t(appName)}</p>
        </div>
        <div className="clicks-counter">
          <p>{clicks}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="container-feedback">
      <div>
        <div className="screen ">
          <HeaderBlack />
          <div className="feedback-header">
            <Link to={"/feedback"}>
              {" "}
              <img src={iconConfig.arrowBackBlue} alt="back" />
            </Link>
            <img id="feedback-logo" src={iconConfig.feedbackLogo} alt="logo" />
            <Link to={"/thanks-for-your-feedback"}>
              <img src={iconConfig.addFeedback} alt="add-feedback" />
            </Link>
          </div>
          <div className="clicks">
            <div className="clicks-container">
              <h4 className="tgray">{t("clicksCounter")}</h4>
              {clicks.length > 0 ? (
                clicks.map((click) =>
                  listApps(click.appName, click.clicks, click._id)
                )
              ) : (
                <p>Nenhum dado disponível.</p>
              )}
            </div>

            <div className="statistics-footer">
              <FeedbackFooter />
            </div>
            <HomeButtonFeedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackClicks;
