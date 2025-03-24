import { useEffect, useRef, useState } from "react";

const Stopwatch = ({
  stopwatch,
  deleteStopwatch,
}) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  const handleStart = () => {
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);
  };

  const handlePause = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  const handleClear = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
    setTime(0);
  };
  const handleDelete = () => {
    clearInterval(intervalRef.current);
    deleteStopwatch(stopwatch);
  }
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

        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default Stopwatch;
