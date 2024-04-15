import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import "../styles/facetime.css";
import iconConfig from "../components/iconConfig";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import facetimeMonday from "../assets/facetime/monday.mp4";
import facetimeTuesday from "../assets/facetime/tuesday.mp4";
import facetimeWednesday from "../assets/facetime/wednesday.mp4";
import facetimeThursday from "../assets/facetime/thursday.mp4";
import facetimeFriday from "../assets/facetime/friday.mp4";
import facetimeSaturday from "../assets/facetime/saturday.mp4";
import facetimeSunday from "../assets/facetime/sunday.mp4";

const Facetime = () => {
  const [videoOn, setVideoOn] = useState(false);
  const [videoWatched, setVideoWatched] = useState(false);

  const { t } = useTranslation();

  useEffect(() => {
    if (videoWatched) {
      setVideoOn(false);
      setVideoWatched(false);
    }
  }, [videoWatched]);

  const day = new Date().getDay();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  const currentDay = days[day].toLowerCase();

  const videos = {
    sunday: facetimeSunday,
    monday: facetimeMonday,
    tuesday: facetimeTuesday,
    wednesday: facetimeWednesday,
    thursday: facetimeThursday,
    friday: facetimeFriday,
    saturday: facetimeSaturday,
  };

  return (
    <div className="container-facetime">
      <div className="screen">
        <Header />

        {videoOn ? null : (
          <div className="facetime-screen">
            <div className="facetime-header">
              <span>{t("facetimeVideo")}</span>
              <p>Raiffe Moura</p>
            </div>

            <div className="facetime-photo">
              <img src={iconConfig.facetimeAvatar} alt="" />
            </div>
            <div className="facetime-buttons">
              <div>
                <img src={iconConfig.facetimeRemind} alt="" />
                <p>{t("remindMe")}</p>
              </div>
              <div>
                <img src={iconConfig.facetimeMessages} alt="" />
                <p>{t("message")}</p>
              </div>
            </div>
            <div className="facetime-buttons">
              <Link to={"/"}>
                <div>
                  <div className="facetime-decline">
                    <img src={iconConfig.facetimeDecline} alt="" />
                  </div>
                  <p>{t("decline")}</p>
                </div>
              </Link>
              <div>
                <div
                  className="facetime-accept"
                  onClick={() => setVideoOn(true)}
                >
                  <img src={iconConfig.facetimeAccept} alt="" />
                </div>
                <p>{t("accept")}</p>
              </div>
            </div>
          </div>
        )}
        {videoOn ? (
          <div className="facetime-video">
            <video autoPlay controls onEnded={() => setVideoWatched(true)}>
              <source src={videos[currentDay]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ) : null}
        <div className="mg-home-button-adjust">
          <HomeButton />
        </div>
      </div>
    </div>
  );
};

export default Facetime;
