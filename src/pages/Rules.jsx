import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background font-prompt p-5 flex flex-col gap-5 max-w-lg mx-auto">
      <button
        onClick={() => navigate("/")}
        className="flex items-center gap-1 text-muted-foreground text-sm"
      >
        <ChevronLeft size={18} /> กลับ
      </button>

      <h1 className="text-3xl font-black" style={{ color: "hsl(280,80%,65%)" }}>
        กฎการเล่น โป๊ะ
      </h1>

      <Section title="วัตถุประสงค์">
        <p>ผู้เล่นส่วนใหญ่รู้สถานที่ มีแค่ <span className="text-red-400 font-bold">สปาย 1 คน</span> ที่ไม่รู้ ทุกคนต้องคุยกันโดยไม่เปิดเผยสถานที่ตรงๆ เพื่อจับว่าใครคือสปาย</p>
      </Section>

      <Section title="บทบาท">
        <RoleItem color="hsl(120,60%,50%)" label="รู้จริง" desc="รู้สถานที่ที่ถูกต้อง — พูดให้น่าเชื่อโดยไม่บอกตรงๆ" />
        <RoleItem color="hsl(200,70%,55%)" label="คำใบ้" desc="ได้รับ 3 คำที่เกี่ยวข้อง ไม่รู้ชื่อสถานที่จริง" />
        <RoleItem color="hsl(0,72%,55%)" label="SPY" desc="ไม่รู้สถานที่เลย ต้องฟังและแกล้งทำเป็นรู้ — หากถูกจับต้องเดาให้ถูก!" />
      </Section>

      <Section title="การแจกบทบาท">
        <div className="grid grid-cols-2 gap-2 text-sm">
          {[
            ["3 คน", "1 รู้จริง, 1 คำใบ้, 1 สปาย"],
            ["4 คน", "2 รู้จริง, 1 คำใบ้, 1 สปาย"],
            ["5 คน", "2 รู้จริง, 2 คำใบ้, 1 สปาย"],
            ["6 คน", "3 รู้จริง, 2 คำใบ้, 1 สปาย"],
            ["7 คน", "4 รู้จริง, 2 คำใบ้, 1 สปาย"],
            ["8 คน", "4 รู้จริง, 3 คำใบ้, 1 สปาย"],
          ].map(([p, r]) => (
            <div key={p} className="bg-card border border-border rounded-lg p-2">
              <p className="font-bold text-primary">{p}</p>
              <p className="text-muted-foreground text-xs">{r}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="ลำดับการเล่น">
        <ol className="space-y-2 text-sm text-foreground/80">
          <li className="flex gap-2"><span className="text-primary font-bold">1.</span> เลือกจำนวนผู้เล่น ใส่ชื่อ (ไม่บังคับ)</li>
          <li className="flex gap-2"><span className="text-primary font-bold">2.</span> ส่งโทรศัพท์ให้แต่ละคนดูบทบาทตัวเองแบบส่วนตัว</li>
          <li className="flex gap-2"><span className="text-primary font-bold">3.</span> จับเวลา 3 นาที คุยจับพิรุธ</li>
          <li className="flex gap-2"><span className="text-primary font-bold">4.</span> โหวตว่าใครคือสปาย</li>
          <li className="flex gap-2"><span className="text-primary font-bold">5.</span> เฉลยผล — สปายแพ้ถ้าถูกจับ แต่ชนะถ้าเดาสถานที่ถูก!</li>
        </ol>
      </Section>

      <Section title="เคล็ดลับ">
        <ul className="space-y-1 text-sm text-foreground/70 list-disc list-inside">
          <li>อย่าพูดชื่อสถานที่ตรงๆ</li>
          <li>สปาย — ฟังมากๆ แล้วพูดให้คลุมเครือ</li>
          <li>คำใบ้ — ใช้คำที่ได้รับแต่อย่าชี้ชัดเกินไป</li>
          <li>ถ้าสปายถูกโหวต สปายได้เดาสถานที่ 1 ครั้ง</li>
        </ul>
      </Section>

      <div className="h-8" />
    </div>
  );
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-2">{title}</h2>
      <div className="bg-card border border-border rounded-2xl p-4">{children}</div>
    </div>
  );
}

function RoleItem({ color, label, desc }) {
  return (
    <div className="flex gap-3 items-start py-2 border-b border-border last:border-0">
      <span className="font-black text-sm px-2 py-1 rounded-md text-black" style={{ background: color }}>
        {label}
      </span>
      <p className="text-sm text-foreground/80 flex-1">{desc}</p>
    </div>
  );
}