import { useEffect, useState } from "react";

const Stopwatch = ({
  stopwatch,
  setStopwatches,
  deleteStopwatch,
}) => {
  const [time, setTime] = useState(stopwatch.time);
  const [isRunning, setIsRunning] = useState(stopwatch.isRunning);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  useEffect(() => {
    setStopwatches((prev) =>
      prev.map((item) =>
        item.id === item.id ? { ...item, time, isRunning } : item
      )
    );
  }, [time, isRunning, stopwatch.id, setStopwatches]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleClear = () => {
    setTime(0);
    setIsRunning(false);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div
      className="stopwatch-item"
    >
      <div className="stopwatch-time">
        {formatTime(time)}
      </div>
      {!isRunning && time === 0 && (
        <button
          className="stopwatch-button"
          onClick={handleStart}
        >
          Start
        </button>
      )}
      {isRunning && (
        <button
          className="stopwatch-button"

          onClick={handlePause}
        >
          Pause
        </button>
      )}
      {!isRunning && time > 0 && (
        <button
          className="stopwatch-button"

          onClick={handleStart}
        >
          Resume
        </button>
      )}
      {time > 0 && (
        <button
          className="stopwatch-button"

          onClick={handleClear}
        >
          Clear
        </button>
      )}
      <button
        className="stopwatch-button"

        onClick={() => deleteStopwatch(stopwatch.id)}
      >
        Delete
      </button>
    </div>
  );
};

export default Stopwatch;
