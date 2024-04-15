import React, { useState } from "react";
import Header from "../components/Header";
import HomeButton from "../components/HomeButton";
import "../styles/clock.css";
import iconConfig from "../components/iconConfig";
import Stopwatch from "../components/Stopwatch";

export default function Clock() {
  const [selected, setSelected] = useState("stopwatch");

  const handleSelected = (e) => {
    setSelected(e);
  };
  return (
    <div className="container-calculator">
      <div className="screen">
        <Header />

        <div className="clock-container">
          <Stopwatch />
          <div className="clock-footer">
            <div
              className={
                selected === "world"
                  ? "clock-footer-icon clock-footer-text-selected"
                  : "clock-footer-icon"
              }
              onClick={() => handleSelected("world")}
            >
              <img
                src={
                  selected === "world"
                    ? iconConfig.clockWorldzoneSelected
                    : iconConfig.clockWorldzone
                }
                alt="icon"
              />
              <p>World Clock</p>
            </div>
            <div
              className={
                selected === "alarms"
                  ? "clock-footer-icon clock-footer-text-selected"
                  : "clock-footer-icon"
              }
              onClick={() => handleSelected("alarms")}
            >
              <img
                src={
                  selected === "alarms"
                    ? iconConfig.clockAlarmSelected
                    : iconConfig.clockAlarm
                }
                alt="icon"
              />
              <p>Alarms</p>
            </div>
            <div
              className={
                selected === "stopwatch"
                  ? "clock-footer-icon clock-footer-text-selected"
                  : "clock-footer-icon"
              }
              onClick={() => handleSelected("stopwatch")}
            >
              <img
                src={
                  selected === "stopwatch"
                    ? iconConfig.clockStopwatcherSelected
                    : iconConfig.clockStopwatcher
                }
                alt="icon"
              />{" "}
              <p>Stopwatch</p>
            </div>
            <div
              className={
                selected === "timers"
                  ? "clock-footer-icon clock-footer-text-selected"
                  : "clock-footer-icon"
              }
              onClick={() => handleSelected("timers")}
            >
              <img
                src={
                  selected === "timers"
                    ? iconConfig.clockTimerSelected
                    : iconConfig.clockTimer
                }
                alt="icon"
              />{" "}
              <p>Timers</p>
            </div>
          </div>
        </div>

        <div className="adjust-settings-homebutton">
          <HomeButton />
        </div>
      </div>
    </div>
  );
}
