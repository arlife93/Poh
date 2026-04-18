import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useGame } from "../lib/useGame.jsx";

export default function CardReveal() {
  const navigate = useNavigate();
  const { round, setRound } = useGame();
  const [revealed, setRevealed] = useState(false);

  if (!round) {
    navigate("/");
    return null;
  }

  const { players, currentPlayerIndex } = round;
  const player = players[currentPlayerIndex];
  const isLast = currentPlayerIndex === players.length - 1;

  const handleNext = () => {
    setRevealed(false);
    if (isLast) {
      navigate("/timer");
    } else {
      setRound({ ...round, currentPlayerIndex: currentPlayerIndex + 1 });
    }
  };

  return (
    <div className="min-h-screen bg-background font-prompt flex flex-col items-center justify-between p-6 max-w-lg mx-auto">
      {/* Progress */}
      <div className="w-full">
        <div className="flex justify-between text-sm text-muted-foreground mb-2">
          <span>แจกบทบาท</span>
          <span>{currentPlayerIndex + 1} / {players.length}</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div
            className="h-2 rounded-full transition-all"
            style={{
              width: `${((currentPlayerIndex + 1) / players.length) * 100}%`,
              background: "hsl(280,80%,60%)",
            }}
          />
        </div>
      </div>

      {/* Card area */}
      <div className="flex-1 flex flex-col items-center justify-center w-full gap-6">
        {!revealed ? (
          // Confirmation screen
          <div className="w-full flex flex-col items-center gap-6">
            <div className="bg-card border border-border rounded-3xl p-8 w-full text-center">
              <p className="text-muted-foreground text-sm mb-1">ส่งเครื่องให้</p>
              <p className="text-4xl font-black text-foreground">{player.name}</p>
            </div>
            <p className="text-muted-foreground text-sm text-center">
              ดูข้อมูลของตัวเองเท่านั้น<br />อย่าให้คนอื่นเห็น
            </p>
            <button
              onClick={() => setRevealed(true)}
              className="w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3"
              style={{ background: "hsl(280,80%,60%)", color: "white" }}
            >
              <Eye size={24} /> เปิดข้อมูล
            </button>
          </div>
        ) : (
          // Role reveal screen
          <div className="w-full flex flex-col items-center gap-5">
            <RoleCard player={player} />
            <button
              onClick={handleNext}
              className="w-full py-5 rounded-2xl text-xl font-bold flex items-center justify-center gap-3 bg-secondary text-secondary-foreground border border-border"
            >
              <EyeOff size={22} />
              {isLast ? "ซ่อนแล้ว — ไปจับเวลา" : "ซ่อนแล้วส่งต่อ"}
            </button>
          </div>
        )}
      </div>

      <div className="h-4" />
    </div>
  );
}

function RoleCard({ player }) {
  const roleConfig = {
    real: {
      label: "รู้จริง",
      color: "hsl(120,60%,45%)",
      bg: "hsl(120,60%,12%)",
      border: "hsl(120,60%,25%)",
    },
    clue: {
      label: "คำใบ้",
      color: "hsl(200,70%,55%)",
      bg: "hsl(200,70%,10%)",
      border: "hsl(200,70%,22%)",
    },
    spy: {
      label: "SPY",
      color: "hsl(0,72%,60%)",
      bg: "hsl(0,72%,10%)",
      border: "hsl(0,72%,25%)",
    },
  };
  const cfg = roleConfig[player.role];

  return (
    <div
      className="w-full rounded-3xl p-6 flex flex-col items-center gap-5 border"
      style={{ background: cfg.bg, borderColor: cfg.border }}
    >
      <div>
        <span
          className="text-xl font-black px-5 py-2 rounded-full"
          style={{ color: cfg.color, background: `${cfg.color}22` }}
        >
          {cfg.label}
        </span>
      </div>

      {player.role === "real" && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-1">สถานที่</p>
          <p className="text-4xl font-black" style={{ color: cfg.color }}>
            {player.location}
          </p>
        </div>
      )}

      {player.role === "clue" && (
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-3">คำใบ้ของคุณ</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {player.clues.map((c, i) => (
              <span
                key={i}
                className="text-xl font-bold px-4 py-2 rounded-xl"
                style={{ color: cfg.color, background: `${cfg.color}22` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>
      )}

      {player.role === "spy" && (
        <div className="text-center">
          <p className="text-4xl font-black" style={{ color: cfg.color }}>
            ???
          </p>
          <p className="text-muted-foreground mt-2">คุณไม่รู้สถานที่</p>
          <p className="text-sm text-muted-foreground mt-1">ฟัง เดา และอย่าถูกจับ!</p>
        </div>
      )}
    </div>
  );
}