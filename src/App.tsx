import { DateTime } from "luxon";
import "./App.css";
import GridLayout from "./Component/GridLayout/GridLayout";
import React from "react";

function App() {
  const [currentDesriedWeek, setCurrentDesiredWeek] = React.useState(
    DateTime.now().toSeconds()
  );

  const handleNextWeek = () => {
    setCurrentDesiredWeek((curentTime) => {
      return DateTime.fromSeconds(curentTime).plus({ weeks: 1 }).toSeconds();
    });
  };

  const handlePreviousWeek = () => {
    setCurrentDesiredWeek((curentTime) => {
      return DateTime.fromSeconds(curentTime).minus({ weeks: 1 }).toSeconds();
    });
  };

  return (
    <div className="App">
      <button onClick={handlePreviousWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
      <GridLayout currentDesriedWeek={currentDesriedWeek} />
    </div>
  );
}

export default App;
