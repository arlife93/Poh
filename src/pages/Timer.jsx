import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Play, Pause, SkipForward } from "lucide-react";
import { useGame } from "../lib/useGame.jsx";

export default function Timer() {
  const navigate = useNavigate();
  const { round } = useGame();
  const minutes = round?.timerMinutes ?? 3;
  const [seconds, setSeconds] = useState(minutes * 60);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!round) navigate("/");
  }, [round]);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds((s) => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            // Vibrate if supported
            if (navigator.vibrate) navigator.vibrate([400, 200, 400]);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const total = minutes * 60;
  const progress = seconds / total;
  const isDone = seconds === 0;

  const radius = 120;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <div className="min-h-screen bg-background font-prompt flex flex-col items-center justify-between p-6 max-w-lg mx-auto">
      <div className="w-full text-center pt-4">
        <h1 className="text-xl font-bold text-foreground">จับเวลา</h1>
        <p className="text-sm text-muted-foreground mt-1">คุยกันเพื่อจับพิรุธสปาย</p>
      </div>

      {/* Circle timer */}
      <div className="flex flex-col items-center gap-6 flex-1 justify-center">
        <div className="relative">
          <svg width="280" height="280" viewBox="0 0 280 280">
            {/* Background circle */}
            <circle
              cx="140" cy="140" r={radius}
              fill="none"
              stroke="hsl(250,12%,20%)"
              strokeWidth="12"
            />
            {/* Progress circle */}
            <circle
              cx="140" cy="140" r={radius}
              fill="none"
              stroke={isDone ? "hsl(0,72%,55%)" : "hsl(280,80%,60%)"}
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              transform="rotate(-90 140 140)"
              style={{ transition: "stroke-dashoffset 1s linear" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-6xl font-black ${isDone ? "text-red-400" : "text-foreground"}`}>
              {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
            {isDone && (
              <span className="text-red-400 font-bold text-lg mt-1">หมดเวลา!</span>
            )}
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3 w-full">
          <button
            onClick={() => setRunning((r) => !r)}
            disabled={isDone}
            className="flex-1 py-4 rounded-2xl text-lg font-bold flex items-center justify-center gap-2 text-white disabled:opacity-50"
            style={{ background: running ? "hsl(45,80%,55%)" : "hsl(280,80%,60%)" }}
          >
            {running ? <><Pause size={22} /> หยุด</> : <><Play size={22} /> เริ่มจับเวลา</>}
          </button>
        </div>
      </div>

      {/* Skip to vote */}
      <div className="w-full">
        <button
          onClick={() => navigate("/voting")}
          className="w-full py-4 rounded-2xl text-lg font-bold border border-border text-muted-foreground flex items-center justify-center gap-2"
        >
          <SkipForward size={20} /> ข้ามไปโหวต
        </button>
      </div>
    </div>
  );
}