import React from "react";
import { Link } from "react-router-dom";
import iconConfig from "../iconConfig";
import { useTranslation } from "react-i18next";

const FeedbackFooter = () => {
  const { t } = useTranslation();

  return (
    <div className="tblack feedback-footer">
      <div className="feedback-footer-icons">
        <Link to={"/feedback"}>
          <img src={iconConfig.feedbackHome} alt="home" />
        </Link>
        <Link to={"/feedback"}>
          <p>{t("home")}</p>
        </Link>
      </div>
      <div className="feedback-footer-icons">
        <Link to={"/statistics"}>
          <img src={iconConfig.statistics} alt="statistics" />
        </Link>
        <Link to={"/statistics"}>
          <p>{t("statistics")}</p>
        </Link>
      </div>
      <div className="feedback-footer-icons">
        <Link to={"/clicks"}>
          <img src={iconConfig.feedbackClicks} alt="statistics" />
        </Link>
        <Link to={"/clicks"}>
          <p>{t("clicks")}</p>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackFooter;
