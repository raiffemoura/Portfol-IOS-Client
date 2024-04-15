import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import iconConfig from "./iconConfig";
import "../styles/notifications.css";
import { useTranslation } from "react-i18next";

const Notifications = () => {
  const { t } = useTranslation();
  const [msg, setMsg] = useState(true);
  const [msgFeedback, setMsgFeedback] = useState(true);

  const notificationActiveTimer = () => {
    setTimeout(() => {
      setMsg(false);
      setTimeout(() => {
        setMsg(true);
      }, 13000);
    }, 500);
  };

  const notificationFeedback = () => {
    setTimeout(() => {
      setMsgFeedback(false);
      setTimeout(() => {
        setMsgFeedback(true);
      }, 13000);
    }, 500);
  };

  useEffect(() => {
    const lastNotificationTip = localStorage.getItem("lastNotificationTip");
    const lastNotificationFeedback = localStorage.getItem(
      "lastNotificationFeedback"
    );
    let tipShowed = localStorage.getItem("tipShowed");
    const currentTime = new Date().getTime();

    if (tipShowed === null) {
      setTimeout(() => {
        tipShowed = "false";
        localStorage.setItem("tipShowed", "false");
      }, 5900);
    }

    if (tipShowed === "true") {
      if (
        !lastNotificationFeedback ||
        currentTime - lastNotificationFeedback > 6 * 60 * 60 * 1000
      ) {
        setTimeout(() => {
          notificationFeedback();
          localStorage.setItem("lastNotificationFeedback", currentTime);
          localStorage.setItem("tipShowed", "false");
        }, 6000);
      }
    } else {
      if (
        !lastNotificationTip ||
        currentTime - lastNotificationTip > 6 * 60 * 60 * 1000
      ) {
        setTimeout(() => {
          notificationActiveTimer();
          localStorage.setItem("lastNotificationTip", currentTime);
          localStorage.setItem("tipShowed", "true");
        }, 6000);
      }
    }
  }, []);

  return (
    <div className="notification-container">
      <div className={`notification ${msg ? "desactived" : "actived"}`}>
        {!msg ? (
          <div className="notification-icon ">
            <img
              className={
                msg
                  ? "notification-text-desactived"
                  : "notification-text-actived "
              }
              src={iconConfig.avatar}
              alt=""
            />
          </div>
        ) : (
          ""
        )}
        {!msg ? (
          <div className="notification-text">
            <p
              className={
                msg
                  ? "notification-text-desactived"
                  : "notification-text-actived text-color "
              }
            >
              Raiffe Moura
            </p>
            <p
              className={
                msg
                  ? "notification-text-desactived"
                  : "notification-text-actived "
              }
            >
              {t("heythere")}
              <Link to={"/Settings"}>
                <b style={{ color: "orange" }}>Settings App!</b>
              </Link>
            </p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className={`notification ${msgFeedback ? "desactived" : "actived"}`}>
        {!msgFeedback ? (
          <div className="notification-icon ">
            <img
              className={
                msgFeedback
                  ? "notification-text-desactived"
                  : "notification-text-actived "
              }
              src={iconConfig.avatar}
              alt=""
            />
          </div>
        ) : (
          ""
        )}
        {!msgFeedback ? (
          <div className="notification-text">
            <p
              className={
                msgFeedback
                  ? "notification-text-desactived"
                  : "notification-text-actived text-color "
              }
            >
              Raiffe Moura
            </p>
            <p
              className={
                msgFeedback
                  ? "notification-text-desactived"
                  : "notification-text-actived "
              }
            >
              {t("dontforget")}
              <Link to={"/Feedback"}>
                <b style={{ color: "orange" }}>Feedback App!</b>{" "}
              </Link>
              {t("thanks")}
            </p>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Notifications;
