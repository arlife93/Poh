import { EyeOff, MapPin, HelpCircle, Skull } from "lucide-react";

export default function PlayerCardContent({ player, onNext, isLast }) {
  const isSpy = player.role === "spy";
  const isReal = player.role === "real";
  const isClue = player.role === "clue";

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="w-full max-w-sm">
        {/* Role badge */}
        <div className="flex flex-col items-center mb-6">
          {isReal && (
            <>
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-3">
                <MapPin className="w-8 h-8 text-emerald-400" />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold text-lg">
                รู้จริง
              </span>
            </>
          )}
          {isClue && (
            <>
              <div className="w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-3">
                <HelpCircle className="w-8 h-8 text-yellow-400" />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-yellow-500/20 text-yellow-400 font-bold text-lg">
                คำใบ้
              </span>
            </>
          )}
          {isSpy && (
            <>
              <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-3">
                <Skull className="w-8 h-8 text-red-400" />
              </div>
              <span className="px-4 py-1.5 rounded-full bg-red-500/20 text-red-400 font-bold text-lg">
                SPY
              </span>
            </>
          )}
        </div>

        {/* Content */}
        <div className="bg-card rounded-2xl p-6 border border-border mb-8">
          {isReal && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-2">สถานที่คือ</p>
              <p className="text-3xl font-black text-foreground">{player.location}</p>
            </div>
          )}
          {isClue && (
            <div className="text-center">
              <p className="text-muted-foreground text-sm mb-4">คำใบ้ของคุณ</p>
              <div className="flex flex-wrap gap-3 justify-center">
                {player.clues.map((clue, i) => (
                  <span
                    key={i}
                    className="px-5 py-3 rounded-xl bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-xl font-bold"
                  >
                    {clue}
                  </span>
                ))}
              </div>
            </div>
          )}
          {isSpy && (
            <div className="text-center">
              <p className="text-2xl font-bold text-red-400">คุณไม่รู้สถานที่</p>
              <p className="text-muted-foreground text-sm mt-2">พยายามแกล้งรู้ อย่าให้โดนจับ!</p>
            </div>
          )}
        </div>

        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl bg-secondary text-secondary-foreground text-lg font-bold active:scale-95 transition-transform flex items-center justify-center gap-3"
        >
          <EyeOff className="w-5 h-5" />
          {isLast ? "ซ่อนแล้วเริ่มจับเวลา" : "ซ่อนแล้วส่งต่อ"}
        </button>
      </div>
    </div>
  );
}