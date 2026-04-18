import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../lib/useGame.jsx";

export default function Result() {
  const navigate = useNavigate();
  const { round, history, addHistory } = useGame();
  const [saved, setSaved] = useState(false);

  if (!round) {
    navigate("/");
    return null;
  }

  const spy = round.players.find((p) => p.role === "spy");

  const handleNewRound = () => {
    if (!saved) {
      addHistory({ location: round.location, spy: spy.name });
      setSaved(true);
    }
    navigate("/setup");
  };

  const roleLabel = { real: "รู้จริง", clue: "คำใบ้", spy: "SPY" };
  const roleColor = { real: "text-green-400", clue: "text-blue-400", spy: "text-red-400" };

  return (
    <div className="min-h-screen bg-background font-prompt flex flex-col max-w-lg mx-auto">
      <div className="p-5 border-b border-border text-center">
        <h1 className="text-2xl font-black" style={{ color: "hsl(280,80%,65%)" }}>เฉลย!</h1>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-5 overflow-y-auto">
        {/* Location reveal */}
        <div className="bg-card border border-border rounded-3xl p-5 text-center">
          <p className="text-muted-foreground text-sm mb-1">สถานที่จริงคือ</p>
          <p className="text-4xl font-black text-foreground">{round.location}</p>
        </div>

        {/* Spy reveal */}
        <div className="bg-red-950/50 border border-red-700/50 rounded-3xl p-5 text-center">
          <p className="text-red-400/70 text-sm mb-1">สปายคือ</p>
          <p className="text-4xl font-black text-red-400">{spy?.name}</p>
          <p className="text-red-400/60 text-sm mt-1">🕵️ ถูกจับแล้ว!</p>
        </div>

        {/* All players */}
        <div>
          <p className="text-muted-foreground text-sm mb-3">บทบาททั้งหมด</p>
          <div className="flex flex-col gap-2">
            {round.players.map((p, i) => (
              <div
                key={i}
                className={`flex items-center justify-between bg-card border rounded-xl px-4 py-3 ${
                  p.role === "spy" ? "border-red-700/50" : "border-border"
                }`}
              >
                <span className="font-semibold text-foreground">{p.name}</span>
                <span className={`font-bold text-sm ${roleColor[p.role]}`}>
                  {roleLabel[p.role]}{p.role === "spy" && " 🕵️"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Round history */}
        {history.length > 0 && (
          <div>
            <p className="text-muted-foreground text-sm mb-3">ประวัติรอบก่อน</p>
            <div className="flex flex-col gap-2">
              {history.slice().reverse().map((h, i) => (
                <div key={i} className="bg-card border border-border rounded-xl px-4 py-3 flex justify-between text-sm">
                  <span className="text-foreground/70">{h.location}</span>
                  <span className="text-red-400">สปาย: {h.spy}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="p-5 border-t border-border flex flex-col gap-3">
        <button
          onClick={handleNewRound}
          className="w-full py-5 rounded-2xl text-2xl font-bold text-white"
          style={{ background: "hsl(280,80%,60%)" }}
        >
          เล่นรอบใหม่
        </button>
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 rounded-2xl text-base font-semibold border border-border text-muted-foreground"
        >
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}