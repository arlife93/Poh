import { useLocation, useNavigate } from "react-router-dom";
import { RotateCcw, MapPin, Skull } from "lucide-react";

export default function Reveal() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state?.round) {
    navigate("/");
    return null;
  }

  const { round, votedPlayer } = state;
  const spy = round.players.find((p) => p.role === "spy");
  const votedCorrectly = votedPlayer !== null && votedPlayer !== undefined && round.players[votedPlayer]?.role === "spy";

  // Save to history
  const saveHistory = () => {
    const existing = JSON.parse(localStorage.getItem("pope_history") || "[]");
    existing.unshift({
      location: round.location,
      spy: spy?.name,
      correct: votedCorrectly,
      date: new Date().toISOString(),
    });
    // Keep last 20
    localStorage.setItem("pope_history", JSON.stringify(existing.slice(0, 20)));
  };

  const handleNewRound = () => {
    saveHistory();
    navigate("/setup");
  };

  const handleHome = () => {
    saveHistory();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background px-5 py-8 max-w-lg mx-auto">
      {/* Result banner */}
      <div className={`text-center rounded-2xl p-6 mb-6 ${votedCorrectly ? "bg-emerald-500/10" : "bg-red-500/10"}`}>
        <span className="text-5xl mb-3 block">{votedCorrectly ? "🎉" : "😈"}</span>
        <h1 className="text-2xl font-black">
          {votedCorrectly ? "ทีมชนะ! จับสปายถูก!" : "สปายชนะ! จับผิดคน!"}
        </h1>
      </div>

      {/* Location */}
      <div className="bg-card rounded-2xl p-5 border border-border mb-4 flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
          <MapPin className="w-6 h-6 text-primary" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">สถานที่ในรอบนี้</p>
          <p className="text-2xl font-bold">{round.location}</p>
        </div>
      </div>

      {/* Player roles */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden mb-8">
        <div className="px-5 py-3 border-b border-border">
          <h3 className="font-bold">บทบาททุกคน</h3>
        </div>
        <div className="divide-y divide-border">
          {round.players.map((player, i) => (
            <div
              key={i}
              className={`px-5 py-3 flex items-center justify-between ${
                player.role === "spy" ? "bg-red-500/10" : ""
              }`}
            >
              <div className="flex items-center gap-3">
                {player.role === "spy" && <Skull className="w-5 h-5 text-red-400" />}
                <span className={`font-semibold ${player.role === "spy" ? "text-red-400" : ""}`}>
                  {player.name}
                </span>
              </div>
              <RoleBadge role={player.role} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <button
          onClick={handleNewRound}
          className="w-full py-4 rounded-xl bg-primary text-primary-foreground text-xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" />
          เล่นรอบใหม่
        </button>
        <button
          onClick={handleHome}
          className="w-full py-3 rounded-xl bg-secondary text-secondary-foreground text-lg font-semibold active:scale-95 transition-transform"
        >
          กลับหน้าแรก
        </button>
      </div>
    </div>
  );
}

function RoleBadge({ role }) {
  if (role === "real") {
    return (
      <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm font-semibold">
        รู้จริง
      </span>
    );
  }
  if (role === "clue") {
    return (
      <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-400 text-sm font-semibold">
        คำใบ้
      </span>
    );
  }
  return (
    <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-400 text-sm font-bold">
      SPY
    </span>
  );
}