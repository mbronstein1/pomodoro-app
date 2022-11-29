import React, { useState, useRef, useEffect, useContext } from 'react';
import SettingsContext from '../../utils/SettingsContext';
import './timer.css';

export default function Timer() {
    const { workMinutes,
            breakMinutes,
            counterText,
            setWorkMinutes,
            setBreakMinutes,
            setCounterText } = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState("work");
    const [secondsLeft, setSecondsLeft] = useState(0);
    const [display, setDisplay] = useState("none");

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    useEffect(() => {

        function switchMode() {
            const nextMode = modeRef.current === 'work' ? 'break' : 'work';
            const nextSeconds = (nextMode === 'work' ? workMinutes : breakMinutes) * 60;

            setMode(nextMode);
            modeRef.current = nextMode;

            setSecondsLeft(nextSeconds);
            secondsLeftRef.current = nextSeconds;
        }

        secondsLeftRef.current = workMinutes * 60;
        setSecondsLeft(secondsLeftRef.current);

        const interval = setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }

            tick();
        }, 1000);

        return () => clearInterval(interval);
    }, [workMinutes,
        breakMinutes,
        counterText,
        setWorkMinutes,
        setBreakMinutes,
        setCounterText]);

    const minutes = Math.floor(secondsLeft / 60);
    let seconds = secondsLeft % 60;
    if (seconds < 10) seconds = '0' + seconds;

    return (
        <div className="button-container">
            <div className="center-text">
                <div>
                    <h1>Pomodoro Counter</h1>
                </div>
                <div>
                    <h2>{counterText}</h2>
                    <p style={{ display }}>{mode === 'work' ? `${minutes}:${seconds} until break` : `${minutes}:${seconds} until work resumes`}</p>
                    {isPaused
                        ? (
                            <>
                                <button type="button" className="start-button" onClick={() => {
                                    setIsPaused(false);
                                    isPausedRef.current = false;
                                    setCounterText("");
                                    setDisplay("block");
                                }}>Start</button>
                            </>
                        ) : (
                            <>
                                <button type="button" className="pause-button" onClick={() => {
                                    setIsPaused(true);
                                    isPausedRef.current = true;
                                }}>Pause</button>
                                <button type="button" className="stop-button" onClick={() => {
                                    setIsPaused(true);
                                    isPausedRef.current = true;
                                    setMode("work");
                                    setCounterText("");
                                    setDisplay("none");
                                    secondsLeftRef.current = 1500;
                                    setSecondsLeft(secondsLeftRef.current);
                                    setCounterText("Click the button below to start the timer")
                                }}>Stop</button>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}