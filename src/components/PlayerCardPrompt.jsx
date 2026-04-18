import { Eye } from "lucide-react";

export default function PlayerCardPrompt({ playerName, onReveal, currentIndex, total }) {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
      <div className="text-sm text-muted-foreground mb-2">
        {currentIndex + 1} / {total}
      </div>
      <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6">
        <span className="text-4xl">🤫</span>
      </div>
      <h2 className="text-2xl font-bold text-center mb-2">ส่งเครื่องให้</h2>
      <h1 className="text-3xl font-black text-primary mb-8">{playerName}</h1>
      <p className="text-muted-foreground text-center text-sm mb-8 max-w-xs">
        ตรวจสอบว่าไม่มีใครแอบดู แล้วกดปุ่มด้านล่าง
      </p>
      <button
        onClick={onReveal}
        className="w-full max-w-xs py-4 rounded-xl bg-primary text-primary-foreground text-xl font-bold active:scale-95 transition-transform flex items-center justify-center gap-3"
      >
        <Eye className="w-6 h-6" />
        เปิดข้อมูล
      </button>
    </div>
  );
}