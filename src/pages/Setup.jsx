import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Shuffle } from "lucide-react";
import { LOCATIONS, generateRound } from "../lib/gameData";
import { useGame } from "../lib/useGame.jsx";

export default function Setup() {
  const navigate = useNavigate();
  const { setRound } = useGame();
  const [playerCount, setPlayerCount] = useState(() => {
    const saved = localStorage.getItem("pote_playerCount");
    return saved ? parseInt(saved) : 4;
  });
  const [names, setNames] = useState(() => {
    const saved = localStorage.getItem("pote_names");
    return saved ? JSON.parse(saved) : Array(4).fill("");
  });
  const [timerMinutes, setTimerMinutes] = useState(3);
  const [selectedLocation, setSelectedLocation] = useState(null); // null = random

  const handleCountChange = (n) => {
    setPlayerCount(n);
    setNames(Array(n).fill("").map((_, i) => names[i] || ""));
    setSelectedLocation(null);
  };

  const handleNameChange = (i, val) => {
    const updated = [...names];
    updated[i] = val;
    setNames(updated);
  };

  const handleShuffle = () => {
    setSelectedLocation(null);
  };

  useEffect(() => {
    localStorage.setItem("pote_playerCount", String(playerCount));
    localStorage.setItem("pote_names", JSON.stringify(names));
  }, [playerCount, names]);

  const handleStart = () => {
    const resolvedNames = Array(playerCount).fill(0).map((_, i) =>
      names[i]?.trim() || `ผู้เล่น ${i + 1}`
    );
    const round = generateRound(resolvedNames, selectedLocation);
    if (!round) return;
    setRound({ ...round, timerMinutes, currentPlayerIndex: 0 });
    navigate("/reveal");
  };

  return (
    <div className="min-h-screen bg-background font-prompt flex flex-col max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 p-5 border-b border-border">
        <button onClick={() => navigate("/")} className="text-muted-foreground">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-xl font-bold">ตั้งค่าเกม</h1>
      </div>

      <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-6">
        {/* Player count */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">จำนวนผู้เล่น</label>
          <div className="grid grid-cols-6 gap-2">
            {[3, 4, 5, 6, 7, 8].map((n) => (
              <button
                key={n}
                onClick={() => handleCountChange(n)}
                className={`py-3 rounded-xl text-lg font-bold border transition-all ${
                  playerCount === n
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Player names */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">ชื่อผู้เล่น (ไม่บังคับ)</label>
          <div className="flex flex-col gap-2">
            {Array(playerCount).fill(0).map((_, i) => (
              <input
                key={i}
                type="text"
                value={names[i] || ""}
                onChange={(e) => handleNameChange(i, e.target.value)}
                placeholder={`ผู้เล่น ${i + 1}`}
                className="bg-card border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground outline-none focus:border-primary w-full text-base"
              />
            ))}
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">สถานที่</label>
          <div className="flex gap-2 items-center">
            <div className="flex-1 bg-card border border-border rounded-xl px-4 py-3 text-base">
              {selectedLocation !== null ? LOCATIONS[selectedLocation].name : "🎲 สุ่มอัตโนมัติ"}
            </div>
            <button
              onClick={handleShuffle}
              className="p-3 bg-card border border-border rounded-xl text-primary"
              title="สุ่มสถานที่"
            >
              <Shuffle size={22} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <button
              onClick={() => setSelectedLocation(null)}
              className={`py-2 px-3 rounded-lg text-sm border transition-all text-left col-span-2 ${
                selectedLocation === null
                  ? "border-primary text-primary bg-primary/10"
                  : "border-border text-muted-foreground"
              }`}
            >
              🎲 สุ่มอัตโนมัติ
            </button>
            {LOCATIONS.map((loc, i) => (
              <button
                key={i}
                onClick={() => setSelectedLocation(i)}
                className={`py-2 px-3 rounded-lg text-sm border transition-all text-left ${
                  selectedLocation === i
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {loc.name}
              </button>
            ))}
          </div>
        </div>

        {/* Timer */}
        <div>
          <label className="text-sm text-muted-foreground mb-3 block">เวลาต่อรอบ</label>
          <div className="grid grid-cols-3 gap-2">
            {[1, 3, 5].map((m) => (
              <button
                key={m}
                onClick={() => setTimerMinutes(m)}
                className={`py-3 rounded-xl text-base font-bold border transition-all ${
                  timerMinutes === m
                    ? "border-primary text-primary bg-primary/10"
                    : "border-border text-muted-foreground"
                }`}
              >
                {m} นาที
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Start button */}
      <div className="p-5 border-t border-border">
        <button
          onClick={handleStart}
          className="w-full py-5 rounded-2xl text-2xl font-bold text-white"
          style={{ background: "hsl(280,80%,60%)" }}
        >
          เริ่มรอบ
        </button>
      </div>
    </div>
  );
}
