import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGame } from "../lib/useGame.jsx";

export default function Voting() {
  const navigate = useNavigate();
  const { round } = useGame();
  const [voted, setVoted] = useState(null);

  if (!round) {
    navigate("/");
    return null;
  }

  const handleReveal = () => {
    if (voted === null) return;
    navigate("/result");
  };

  return (
    <div className="min-h-screen bg-background font-prompt flex flex-col max-w-lg mx-auto">
      <div className="p-5 border-b border-border text-center">
        <h1 className="text-xl font-bold">โหวตหาสปาย</h1>
        <p className="text-sm text-muted-foreground mt-1">ทุกคนช่วยกันตัดสิน — เลือก 1 คน</p>
      </div>

      <div className="flex-1 p-5 flex flex-col gap-3">
        {round.players.map((player, i) => (
          <button
            key={i}
            onClick={() => setVoted(i)}
            className={`w-full py-5 px-5 rounded-2xl text-xl font-bold border-2 transition-all text-left ${
              voted === i
                ? "border-red-500 bg-red-500/15 text-red-400"
                : "border-border bg-card text-foreground"
            }`}
          >
            <span className="text-muted-foreground text-sm font-normal mr-2">{i + 1}.</span>
            {player.name}
            {voted === i && <span className="float-right text-red-400">⚑ สปาย?</span>}
          </button>
        ))}
      </div>

      <div className="p-5 border-t border-border">
        <button
          onClick={handleReveal}
          disabled={voted === null}
          className="w-full py-5 rounded-2xl text-2xl font-bold text-white disabled:opacity-40"
          style={{ background: "hsl(280,80%,60%)" }}
        >
          เฉลย
        </button>
        {voted === null && (
          <p className="text-center text-muted-foreground text-sm mt-3">
            เลือกผู้ต้องสงสัยก่อน
          </p>
        )}
      </div>
    </div>
  );
}