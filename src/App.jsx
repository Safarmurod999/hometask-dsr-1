import { useState } from "react";
import Stopwatch from "./components/StopWatch";
import "./App.css";


const App = () => {
  const [stopwatches, setStopwatches] = useState([]);

  const addStopwatch = () => {
    setStopwatches((prev) => [
      ...prev,
      { id: Date.now(), time: 0, isRunning: false },
    ]);
  };

  const deleteStopwatch = (id) => {
    setStopwatches((prev) => prev.filter((sw) => sw.id !== id));
  };

  return (
    <div className="stopwatch">
      <button
        onClick={addStopwatch}
        className="stopwatch-header"
      >
        Add Stopwatch
      </button>
      <div className="stopwatch-list">
        {stopwatches.map((stopwatch) => (
          <Stopwatch
            key={stopwatch.id}
            stopwatch={stopwatch}
            setStopwatches={setStopwatches}
            deleteStopwatch={deleteStopwatch}
          />
        ))}
      </div>
    </div>
  );
};


export default App;
