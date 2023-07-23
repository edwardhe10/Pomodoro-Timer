import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const focusTime = 25 * 60; // 25 minutes in seconds
  const shortBreakTime = 5 * 60; // 5 minutes in seconds
  const longBreakTime = 15 * 60; // 15 minutes in seconds
  const pomodoroCountForLongBreak = 4;

  const [timer, setTimer] = useState(focusTime);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFocusSession, setIsFocusSession] = useState(true);

  useEffect(() => {
    let interval;
    if (isRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timer === 0) {
      handlePomodoroComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timer]);

  const handlePomodoroComplete = () => {
    setIsRunning(false);

    if (isFocusSession) {
      setPomodoroCount((prevCount) => prevCount + 1);
    }

    if (
      isFocusSession &&
      pomodoroCount > 0 &&
      (pomodoroCount + 1) % pomodoroCountForLongBreak === 0
    ) {
      setTimer(longBreakTime);
      setIsFocusSession(false);
      alert("Time to take a long break!");
    } else if (isFocusSession) {
      setTimer(shortBreakTime);
      setIsFocusSession(false);
      alert("Time to take a short break!");
    } else {
      setTimer(focusTime);
      setIsFocusSession(true);
      alert("Time to focus!");
    }
  };

  /* 
  useEffect(() => {
    console.log(pomodoroCount);
  }, [pomodoroCount]);

  useEffect(() => {
    console.log(isFocusSession);
  }, [isFocusSession]);
  */

  const handleStart = () => {
    setIsRunning(true);
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  const handleSkip = () => {
    setIsRunning(false);
    handlePomodoroComplete();
    console.log("skip: " + isFocusSession);
    console.log("skip: " + pomodoroCount);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimer(focusTime);
    setPomodoroCount(0);
    setIsFocusSession(true);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <div className="pomodoro-timer">
      <h1>Pomodoro Timer</h1>
      <div className="timer">{formatTime(timer)}</div>
      <div className="pomodoro-count">Pomodoros Completed: {pomodoroCount}</div>
      <div className="controls">
        {isRunning ? (
          <button onClick={handlePause}>Pause</button>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
        <button onClick={handleSkip}>Skip</button>
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}

export default App;
