import React, { useState, useEffect } from "react";

export default function Stopwatch() {
  const [startStop, setStartStop] = useState(false);
  const [started, setStarted] = useState(false);
  const [laps, setLaps] = useState([]);
  const [lapMilliseconds, setLapMilliseconds] = useState(0);
  const [lapSeconds, setLapSeconds] = useState(0);
  const [lapMinutes, setLapMinutes] = useState(0);
  const [lapHours, setLapHours] = useState(0);

  const [totalMilliseconds, setTotalMilliseconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    let intervalId;
    if (startStop) {
      intervalId = setInterval(() => {
        setTotalMilliseconds(
          (prevTotalMilliseconds) => prevTotalMilliseconds + 10
        );
        setLapMilliseconds((prevLapMilliseconds) => prevLapMilliseconds + 10);
      }, 10);
    }

    return () => clearInterval(intervalId);
  }, [startStop]);

  useEffect(() => {
    if (totalMilliseconds >= 1000) {
      setTotalSeconds((prevTotalSeconds) => prevTotalSeconds + 1);
      setTotalMilliseconds(0);
    }
    if (lapMilliseconds >= 1000) {
      setLapSeconds((prevLapSeconds) => prevLapSeconds + 1);
      setLapMilliseconds(0);
    }
  }, [totalMilliseconds, lapMilliseconds]);

  useEffect(() => {
    if (totalSeconds >= 60) {
      setTotalMinutes((prevTotalMinutes) => prevTotalMinutes + 1);
      setTotalSeconds(0);
    }
    if (lapSeconds >= 60) {
      setLapMinutes((prevLapMinutes) => prevLapMinutes + 1);
      setLapSeconds(0);
    }
  }, [totalSeconds, lapSeconds]);

  useEffect(() => {
    if (totalMinutes >= 60) {
      setTotalHours((prevTotalHours) => prevTotalHours + 1);
      setTotalMinutes(0);
    }
    if (lapMinutes >= 60) {
      setLapHours((prevLapHours) => prevLapHours + 1);
      setLapMinutes(0);
    }
  }, [totalMinutes, lapMinutes]);

  const toggleStartStop = () => {
    setStartStop(!startStop);
    setStarted(true);
  };

  const lapRecord = () => {
    const newLap = {
      lap: laps.length + 1,
      hours: lapHours,
      minutes: lapMinutes,
      seconds: lapSeconds,
      milliseconds: lapMilliseconds,
      best: false,
      worst: false,
    };

    if (laps.length > 0) {
      const minTimeLap = laps.reduce((min, lap) => {
        const lapTime =
          lap.hours * 3600000 +
          lap.minutes * 60000 +
          lap.seconds * 1000 +
          lap.milliseconds;
        const minTime =
          min.hours * 3600000 +
          min.minutes * 60000 +
          min.seconds * 1000 +
          min.milliseconds;
        return lapTime < minTime ? lap : min;
      });

      const maxTimeLap = laps.reduce((max, lap) => {
        const lapTime =
          lap.hours * 3600000 +
          lap.minutes * 60000 +
          lap.seconds * 1000 +
          lap.milliseconds;
        const maxTime =
          max.hours * 3600000 +
          max.minutes * 60000 +
          max.seconds * 1000 +
          max.milliseconds;
        return lapTime > maxTime ? lap : max;
      });

      if (
        newLap.hours * 3600000 +
          newLap.minutes * 60000 +
          newLap.seconds * 1000 +
          newLap.milliseconds <
        minTimeLap.hours * 3600000 +
          minTimeLap.minutes * 60000 +
          minTimeLap.seconds * 1000 +
          minTimeLap.milliseconds
      ) {
        newLap.best = true;
        const updatedLaps = laps.map((lap) => ({ ...lap, best: false }));
        setLaps([newLap, ...updatedLaps]);
      } else if (
        newLap.hours * 3600000 +
          newLap.minutes * 60000 +
          newLap.seconds * 1000 +
          newLap.milliseconds >
        maxTimeLap.hours * 3600000 +
          maxTimeLap.minutes * 60000 +
          maxTimeLap.seconds * 1000 +
          maxTimeLap.milliseconds
      ) {
        newLap.worst = true;
        const updatedLaps = laps.map((lap) => ({ ...lap, worst: false }));
        setLaps([newLap, ...updatedLaps]);
      } else {
        setLaps((prevLaps) => [...prevLaps, newLap]);
      }
    } else {
      newLap.best = true;
      newLap.worst = true;
      setLaps([newLap]);
    }

    setLapMilliseconds(0);
    setLapSeconds(0);
    setLapMinutes(0);
    setLapHours(0);
  };

  const restart = () => {
    setTotalMilliseconds(0);
    setTotalSeconds(0);
    setTotalMinutes(0);
    setTotalHours(0);
    setLaps([]);
    setLapHours(0);
    setLapMinutes(0);
    setLapSeconds(0);
    setLapMilliseconds(0);
    setStarted(false);
  };

  const formatTimeUnit = (timeUnit) => {
    return timeUnit < 10 ? "0" + timeUnit : timeUnit;
  };

  const formatMilliseconds = (ms) => {
    return ms.toString().slice(0, 2).padStart(2, "0");
  };

  const sortedLaps = laps.slice().sort((a, b) => a.lap - b.lap);

  return (
    <div className="stopwatch-container">
      <div className="stopwatch-timer">
        <p className={totalHours > 0 ? "stopwatch-timer-small" : ""}>
          {totalHours > 0 ? formatTimeUnit(totalHours) + ":" : ""}
          {formatTimeUnit(totalMinutes)}:{formatTimeUnit(totalSeconds)}:
          {formatMilliseconds(totalMilliseconds)}
        </p>
      </div>
      <div className="stopwatch-buttons">
        {startStop ? (
          <button className="stopwatch-button-lap" onClick={lapRecord}>
            Lap
          </button>
        ) : laps.length > 0 ? (
          <button className="stopwatch-button-lap" onClick={restart}>
            Reset
          </button>
        ) : (
          <button className="stopwatch-button-lap" onClick={lapRecord}>
            Lap
          </button>
        )}

        {startStop ? (
          <button className="stopwatch-button-stop" onClick={toggleStartStop}>
            Stop
          </button>
        ) : (
          <button className="stopwatch-button-start" onClick={toggleStartStop}>
            Start
          </button>
        )}
      </div>
      <div className="stopwatch-lap-container">
        {started ? (
          <div className="stopwatch-lap">
            <p>Lap {laps.length + 1}</p>
            <p className={lapHours > 0 ? "stopwatch-timer-small" : ""}>
              {lapHours > 0 ? formatTimeUnit(lapHours) + ":" : ""}
              {formatTimeUnit(lapMinutes)}:{formatTimeUnit(lapSeconds)}:
              {formatMilliseconds(lapMilliseconds)}
            </p>
          </div>
        ) : (
          ""
        )}
        {sortedLaps.map((lap, index) => (
          <div
            key={index}
            className={`stopwatch-lap ${
              lap.best === true
                ? "lap-best"
                : lap.worst === true
                ? "lap-worst"
                : ""
            }`}
          >
            <p>Lap {lap.lap}</p>
            <p>
              {lap.hours > 0 ? formatTimeUnit(lap.hours) + ":" : ""}
              {formatTimeUnit(lap.minutes)}:{formatTimeUnit(lap.seconds)}:
              {formatMilliseconds(lap.milliseconds)}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
