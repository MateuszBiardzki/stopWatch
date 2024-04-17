import React, { useState, useEffect, useRef } from 'react'

function Stopwatch() {
 
    
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);
    
    useEffect(() => {
        
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 100);
        } else if (!isRunning && intervalRef.current) {
            clearInterval(intervalRef.current);
        }
        return () => clearInterval(intervalRef.current);

    }, [isRunning]);

    function start() { 
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;


    }
    function stop() {
        setIsRunning(false);
    }
    function reset() {
        setIsRunning(false);
        setElapsedTime(0);
    }
    function formatTime() {
        
        let minutes = Math.floor((elapsedTime % 3600000) / 60000);
        let seconds = Math.floor((elapsedTime % 60000) / 1000);
        let milliseconds = Math.floor((elapsedTime % 1000) / 10);

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
    }
    
    return (

    <>
    
    <div className="stopwatch">
        <div className="display">{formatTime()}</div>
    
    <div className="controls">

        <button className="start-button" onClick={start}>Start</button>
        <button className="stop-button" onClick={stop}>Stop</button>
        <button className="reset-button" onClick={reset}>Reset</button>
        </div>
    </div>
    </>
  )
}

export default Stopwatch