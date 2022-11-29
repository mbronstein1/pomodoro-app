import React, { useState } from 'react';
import Timer from './components/Timer/Timer';
import SettingsContext from './utils/SettingsContext';

function App() {
  const [workMinutes, setWorkMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [counterText, setCounterText] = useState("Click the button below to start the timer")

  return (
    <SettingsContext.Provider value={{
      workMinutes,
      breakMinutes,
      counterText,
      setWorkMinutes,
      setBreakMinutes,
      setCounterText
    }}>
      <Timer />
    </SettingsContext.Provider>
  );
}

export default App;
