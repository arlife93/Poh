import { Link, useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between p-6 font-prompt">
      {/* Rules link top right */}
      <div className="w-full flex justify-end">
        <Link
          to="/rules"
          className="text-muted-foreground text-sm underline"
        >
          กฎการเล่น
        </Link>
      </div>

      {/* Center content */}
      <div className="flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <div>
          <h1 className="text-8xl font-black" style={{ color: "hsl(280,80%,65%)" }}>
            โป๊ะ
          </h1>
          <p className="text-muted-foreground text-lg mt-3 leading-relaxed">
            พูดมากก็หลุด<br />พูดน้อยก็โดนจับ
          </p>
        </div>

        {/* Quick rules */}
        <div className="bg-card border border-border rounded-2xl p-5 w-full max-w-sm text-left">
          <p className="text-muted-foreground text-sm font-semibold mb-3">วิธีเล่น</p>
          <ol className="space-y-2 text-sm text-foreground/80">
            <li className="flex gap-2"><span className="text-primary font-bold">1.</span> แจกข้อมูลให้ครบทุกคน</li>
            <li className="flex gap-2"><span className="text-primary font-bold">2.</span> คุยจับพิรุธ 3 นาที</li>
            <li className="flex gap-2"><span className="text-primary font-bold">3.</span> โหวตหาสปาย</li>
            <li className="flex gap-2"><span className="text-primary font-bold">4.</span> เฉลย</li>
          </ol>
        </div>
      </div>

      {/* Bottom button */}
      <div className="w-full max-w-sm">
        <button
          onClick={() => navigate("/setup")}
          className="w-full py-5 rounded-2xl text-2xl font-bold text-white"
          style={{ background: "hsl(280,80%,60%)" }}
        >
          เริ่มเกม
        </button>
      </div>
    </div>
  );
}