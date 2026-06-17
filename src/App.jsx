import { useState, useEffect } from "react";

// ═══════════════════════════════════════════════════════════
//  ★★★ 일정 수정은 여기만 고치면 됩니다 ★★★
//  새 수행평가가 공지되면 아래 목록에 한 줄 추가하세요.
//
//  형식:
//  { date: "2026-06-날짜", subj: "과목코드", title: "제목", desc: "개요" },
//
//  과목코드: kor(국어) eng(영어) math(수학) sci(과학)
//            soc(사회) hist(한국사) art(예체능) etc(기타)
// ═══════════════════════════════════════════════════════════
const ITEMS = [
  { date: "2026-06-18", subj: "kor",  title: "국어 수행평가 1 — 토론문 작성",   desc: "주제 자유. A4 2장, 서론·본론·결론 구조 필수. 수업 시간 내 제출." },
  { date: "2026-06-23", subj: "eng",  title: "영어 수행평가 1 — 영어 말하기",   desc: "1분 자기소개 스피치. 대본 암기, 발음·유창성 평가. 모둠별 진행." },
  { date: "2026-06-25", subj: "sci",  title: "과학 수행평가 1 — 실험 보고서",   desc: "광합성 실험 결과 정리. 그래프 포함, 고찰 2문단 이상." },
  { date: "2026-06-26", subj: "math", title: "수학 수행평가 1 — 단원 형성평가", desc: "이차함수 단원. 서술형 5문항, 풀이 과정 전부 작성." },
  { date: "2026-06-30", subj: "soc",  title: "사회 수행평가 1 — 조사 발표",     desc: "지역 사회 문제 1개 선정, PPT 5장 이내, 모둠 발표 5분." },
  // ↓ 여기에 새 줄 추가 (윗줄 복사해서 내용만 바꾸면 편해요)

];
// ═══════════════════════════════════════════════════════════

const SUBJ_STYLES = {
  kor:  { bg: "#FAEEDA", color: "#633806", darkBg: "#503010", darkColor: "#FAC775", label: "국어" },
  eng:  { bg: "#E6F1FB", color: "#0C447C", darkBg: "#0a3a6e", darkColor: "#B5D4F4", label: "영어" },
  math: { bg: "#EEEDFE", color: "#3C3489", darkBg: "#2e2570", darkColor: "#CECBF6", label: "수학" },
  sci:  { bg: "#E1F5EE", color: "#085041", darkBg: "#064035", darkColor: "#9FE1CB", label: "과학" },
  soc:  { bg: "#FAECE7", color: "#712B13", darkBg: "#5a2010", darkColor: "#F5C4B3", label: "사회" },
  hist: { bg: "#FBEAF0", color: "#72243E", darkBg: "#5a1c32", darkColor: "#F4C0D1", label: "한국사" },
  art:  { bg: "#F3ECF8", color: "#5B2E7E", darkBg: "#3f2057", darkColor: "#D9BEEF", label: "예체능" },
  etc:  { bg: "#F1EFE8", color: "#444441", darkBg: "#3a3a38", darkColor: "#D3D1C7", label: "기타" }
};

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];
const YEAR = 2026, MONTH = 6;

function useTheme() {
  const [dark, setDark] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    setDark(mq.matches);
    const handler = (e) => setDark(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return dark;
}

function fmt(dateStr) {
  const d = new Date(dateStr + "T00:00:00");
  return { day: d.getDate(), dow: WEEKDAYS[d.getDay()] };
}

export default function PerformanceCalendar() {
  const dark = useTheme();
  const items = [...ITEMS].sort((a, b) => a.date.localeCompare(b.date));

  const c = {
    bg: dark ? "#1a1a1a" : "#ffffff",
    bg2: dark ? "#252525" : "#f7f6f3",
    text: dark ? "#e8e6e1" : "#1a1a1a",
    text2: dark ? "#a8a6a0" : "#6b6966",
    text3: dark ? "#777570" : "#9b9994",
    border: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    accent: dark ? "#6ea8e6" : "#2a6cb6",
    danger: dark ? "#e87070" : "#c0392b"
  };

  const subjStyle = (subj) => {
    const st = SUBJ_STYLES[subj] || SUBJ_STYLES.etc;
    return { background: dark ? st.darkBg : st.bg, color: dark ? st.darkColor : st.color };
  };

  return (
    <div style={{ fontFamily: "system-ui, -apple-system, sans-serif", color: c.text, lineHeight: 1.6 }}>
      <div style={{ marginBottom: 20 }}>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>📌 수행평가 캘린더 - Sample</h1>
        <p style={{ fontSize: 13, color: c.text2, margin: "2px 0 0" }}>1학년 9반 · 총 {items.length}개</p>
      </div>

      <MonthGrid items={items} c={c} dark={dark} subjStyle={subjStyle} />

      <div style={{ marginTop: 24 }}>
        {items.length === 0 && (
          <div style={{ textAlign: "center", color: c.text3, padding: "2rem", fontSize: 14 }}>
            아직 등록된 수행평가가 없어요.
          </div>
        )}
        {items.map((item, idx) => {
          const { day, dow } = fmt(item.date);
          const st = SUBJ_STYLES[item.subj] || SUBJ_STYLES.etc;
          return (
            <div key={idx} style={{
              background: c.bg, border: `0.5px solid ${c.border}`, borderRadius: 12,
              padding: "14px 16px", marginBottom: 8,
              borderLeft: `3px solid ${dark ? st.darkColor : st.color}`
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" }}>
                <span style={{ fontSize: 15, fontWeight: 600 }}>6/{day}</span>
                <span style={{ fontSize: 12, color: c.text3 }}>({dow})</span>
                <span style={{ fontSize: 11, padding: "2px 8px", borderRadius: 4, ...subjStyle(item.subj) }}>{st.label}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: 13, color: c.text2 }}>{item.desc}</div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: 11, color: c.text3, marginTop: 20, textAlign: "center" }}>
        라이트/다크 모드 자동 · 일정은 관리자만 수정 · Design. Crafted by HANSIU
      </p>
    </div>
  );
}

function MonthGrid({ items, c, dark, subjStyle }) {
  const firstDay = new Date(YEAR, MONTH - 1, 1).getDay();
  const daysInMonth = new Date(YEAR, MONTH, 0).getDate();
  const byDay = {};
  items.forEach(it => {
    const d = new Date(it.date + "T00:00:00").getDate();
    (byDay[d] = byDay[d] || []).push(it);
  });

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div style={{ background: c.bg2, borderRadius: 12, padding: 12 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2, marginBottom: 4 }}>
        {WEEKDAYS.map((w, i) => (
          <div key={w} style={{
            textAlign: "center", fontSize: 11, fontWeight: 500, padding: "4px 0",
            color: i === 0 ? c.danger : i === 6 ? c.accent : c.text3
          }}>{w}</div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 2 }}>
        {cells.map((d, i) => (
          <div key={i} style={{
            minHeight: 52, borderRadius: 6, padding: 4,
            background: d && byDay[d] ? (dark ? "rgba(255,255,255,0.03)" : "#fff") : "transparent",
            border: d && byDay[d] ? `0.5px solid ${c.border}` : "none"
          }}>
            {d && (
              <>
                <div style={{ fontSize: 11, color: c.text3, marginBottom: 2 }}>{d}</div>
                {(byDay[d] || []).map((it, k) => (
                  <div key={k} title={it.title} style={{
                    fontSize: 9, lineHeight: 1.3, padding: "1px 4px", borderRadius: 3,
                    marginBottom: 2, ...subjStyle(it.subj),
                    overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap"
                  }}>{SUBJ_STYLES[it.subj]?.label}</div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
