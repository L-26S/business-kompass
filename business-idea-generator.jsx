import { useState, useEffect, useRef } from "react";

const questions = [
  {
    id: 1, block: "Ziel & Rahmen", blockNum: 1,
    question: "Was ist dein Ziel?",
    type: "single",
    options: [
      "Monetäre Freiheit – ich will meinen Job in 12 Monaten kündigen",
      "Nebeneinkommen von 500–1.500 € pro Monat aufbauen",
      "Erstmal testen, ob überhaupt etwas funktioniert",
      "Ich weiß es noch nicht genau"
    ]
  },
  {
    id: 2, block: "Ziel & Rahmen", blockNum: 1,
    question: "Was bist du bereit zu investieren?",
    type: "single",
    options: [
      "Nur Zeit – kein Geld",
      "Bis 500 € Startkapital",
      "Bis 2.000 € wenn die Idee stimmt",
      "Zeit und Geld sind kein primäres Hindernis"
    ]
  },
  {
    id: 3, block: "Ziel & Rahmen", blockNum: 1,
    question: "Wie viel Zeit pro Woche ist realistisch?",
    type: "single",
    options: ["2–5 Stunden", "5–10 Stunden", "10–20 Stunden", "Vollgas wenn es passt"]
  },
  {
    id: 4, block: "Energie & Flow", blockNum: 2,
    question: "Wann vergisst du die Zeit?",
    type: "text",
    placeholder: "Z.B. wenn ich anderen helfe, Probleme löse, kreativ arbeite..."
  },
  {
    id: 5, block: "Energie & Flow", blockNum: 2,
    question: "Wobei würdest du jemandem kostenlos helfen – weil du es einfach kannst?",
    type: "text",
    placeholder: "Was fällt dir leicht, das anderen schwer fällt?"
  },
  {
    id: 6, block: "Energie & Flow", blockNum: 2,
    question: "Was nervt dich bei anderen – wo denkst du \"das könnte ich besser\"?",
    type: "text",
    placeholder: "Dein kritischer Blick ist oft deine größte Stärke..."
  },
  {
    id: 7, block: "Persönlichkeit", blockNum: 3,
    question: "Wie arbeitest du am liebsten?",
    type: "single",
    options: ["Alleine, tief fokussiert", "Mit Menschen, im Austausch", "Beides – je nach Aufgabe"]
  },
  {
    id: 8, block: "Persönlichkeit", blockNum: 3,
    question: "Was liegt dir mehr?",
    type: "single",
    options: ["Schnell viele Dinge anstoßen", "Eines richtig durchziehen"]
  },
  {
    id: 9, block: "Persönlichkeit", blockNum: 3,
    question: "Wie gehst du mit Unsicherheit um?",
    type: "single",
    options: [
      "Ich brauche einen klaren Plan bevor ich starte",
      "Ich lerne lieber durch Ausprobieren"
    ]
  },
  {
    id: 10, block: "Persönlichkeit", blockNum: 3,
    question: "Wie kommunizierst du am liebsten?",
    type: "single",
    options: [
      "Schreiben – Text, Posts, Newsletter",
      "Sprechen – Video, Podcast, Calls",
      "Beides",
      "Keines davon besonders"
    ]
  },
  {
    id: 11, block: "Verborgene Stärken", blockNum: 4,
    question: "Wofür haben dich Menschen schon immer um Rat gefragt?",
    type: "text",
    placeholder: "Freunde, Familie, Kollegen – was fragen sie dich?"
  },
  {
    id: 12, block: "Verborgene Stärken", blockNum: 4,
    question: "Was konntest du schon immer gut – ohne es wirklich gelernt zu haben?",
    type: "text",
    placeholder: "Dinge die für dich selbstverständlich sind, für andere aber nicht..."
  },
  {
    id: 13, block: "Verborgene Stärken", blockNum: 4,
    question: "Was haben andere über dich gesagt, das dich selbst überrascht hat?",
    type: "text",
    placeholder: "Komplimente oder Beobachtungen die du selbst nicht erwartet hättest..."
  },
  {
    id: 14, block: "Leben & Kontext", blockNum: 5,
    question: "Was ist deine aktuelle Lebenssituation?",
    type: "single",
    options: ["Vollzeitjob", "Teilzeit", "Elternzeit / Zuhause", "Studium", "Anderes"]
  },
  {
    id: 15, block: "Leben & Kontext", blockNum: 5,
    question: "Hast du bereits Erfahrung mit Online-Business oder Selbstständigkeit?",
    type: "single",
    options: [
      "Nein – kompletter Neustart",
      "Ich habe es versucht aber nichts hat funktioniert",
      "Ich habe bereits etwas aber es läuft nicht richtig",
      "Ja – ich will skalieren"
    ]
  },
  {
    id: 16, block: "Leben & Kontext", blockNum: 5,
    question: "Mit wem arbeitest du lieber?",
    type: "single",
    options: [
      "Einzelpersonen (1:1)",
      "Gruppen oder Communities",
      "Gar nicht direkt mit Menschen – Produkte, Content"
    ]
  },
  {
    id: 17, block: "Grenzen & Klarheit", blockNum: 6,
    question: "Was willst du auf keinen Fall?",
    type: "multi",
    options: [
      "Vor der Kamera sein",
      "Kaltakquise / aktiv verkaufen",
      "Technisch komplexe Systeme aufbauen",
      "Abhängig von einem einzelnen Kunden sein",
      "Ständige Erreichbarkeit"
    ]
  },
  {
    id: 18, block: "Grenzen & Klarheit", blockNum: 6,
    question: "Was wäre für dich ein Zeichen dass es funktioniert?",
    type: "single",
    options: [
      "Erste 100 € verdient",
      "Erster Kunde der bezahlt hat",
      "Ich kann meinen Job reduzieren",
      "Ich arbeite nur noch für mich"
    ]
  },
  {
    id: 19, block: "Der letzte Filter", blockNum: 7,
    question: "Wenn du an dein Business in 3 Jahren denkst – wie soll es sich anfühlen?",
    type: "text",
    placeholder: "Freiheit, Sinn, Anerkennung, Ruhe, Aufregung...?"
  },
  {
    id: 20, block: "Der letzte Filter", blockNum: 7,
    question: "Was hält dich bisher davon ab zu starten?",
    type: "text",
    placeholder: "Sei ehrlich – keine falsche Antwort hier..."
  }
];

const blocks = [
  { num: 1, name: "Ziel & Rahmen" },
  { num: 2, name: "Energie & Flow" },
  { num: 3, name: "Persönlichkeit" },
  { num: 4, name: "Verborgene Stärken" },
  { num: 5, name: "Leben & Kontext" },
  { num: 6, name: "Grenzen & Klarheit" },
  { num: 7, name: "Der letzte Filter" }
];

function buildPrompt(answers) {
  const qa = questions.map(q => {
    const a = answers[q.id];
    let answerText = "";
    if (!a) answerText = "(keine Antwort)";
    else if (Array.isArray(a)) answerText = a.join(", ");
    else answerText = a;
    return `Frage ${q.id} (${q.block}): ${q.question}\nAntwort: ${answerText}`;
  }).join("\n\n");

  return `Du bist ein erfahrener Business-Stratege und Persönlichkeitsanalyst. Jemand hat dir 20 Fragen beantwortet. Deine Aufgabe: Erstelle 5 maßgeschneiderte Business-Ideen, die wirklich zu DIESER Person passen.

WICHTIG: Sei präzise, persönlich und konkret. Verweise direkt auf die Antworten der Person. Keine generischen Ratschläge.

Hier sind die Antworten:

${qa}

---

Erstelle nun eine strukturierte Analyse im folgenden Format. Antworte NUR mit dem JSON-Objekt, kein Text davor oder danach:

{
  "persoenlichkeitsprofil": "2-3 Sätze über diese Person basierend auf ihren Antworten – was macht sie aus, was ist ihre Energie",
  "ideen": [
    {
      "nummer": 1,
      "titel": "Kurzer prägnanter Titel der Idee",
      "warum_du": "2-3 Sätze warum diese Idee GENAU zu dieser Person passt – mit direktem Bezug auf ihre Antworten",
      "was_genau": "Konkrete Beschreibung was sie anbieten würde",
      "erster_schritt": "Der eine konkrete nächste Schritt – so spezifisch wie möglich",
      "zeitrahmen": "Wann könnte sie realistisch erste Einnahmen sehen",
      "passt_weil": "Kurzes Statement – warum diese Idee zu ihrem Ziel und ihrer Lebenssituation passt"
    }
  ],
  "motivation": "Ein ehrlicher, emotionaler Abschlusssatz für diese Person – kein generisches Coaching-Gerede. Etwas das wirklich trifft. Erwähne: Die kritischen Fragen im Kopf sind ihr Kompass – aber ein Kompass bringt sie nur weiter wenn sie anfängt zu gehen. Gib ihr EINEN einzigen nächsten Schritt."
}`;
}

export default function App() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Sans:wght@300;400;500&display=swap";
    document.head.appendChild(link);
  }, []);

  const DIGISTORE_LINK = "DEIN_DIGISTORE_LINK"; // ← hier deinen Link eintragen

  const [screen, setScreen] = useState("intro"); // intro | quiz | payment | loading | result
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [animating, setAnimating] = useState(false);
  const cardRef = useRef(null);

  const q = questions[current];
  const progress = ((current) / questions.length) * 100;

  function handleSingle(val) {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
  }

  function handleMulti(val) {
    setAnswers(prev => {
      const cur = prev[q.id] || [];
      if (cur.includes(val)) return { ...prev, [q.id]: cur.filter(v => v !== val) };
      return { ...prev, [q.id]: [...cur, val] };
    });
  }

  function handleText(val) {
    setAnswers(prev => ({ ...prev, [q.id]: val }));
  }

  function canProceed() {
    const a = answers[q.id];
    if (q.type === "text") return a && a.trim().length > 2;
    if (q.type === "multi") return a && a.length > 0;
    return !!a;
  }

  function next() {
    if (!canProceed()) return;
    setAnimating(true);
    setTimeout(() => {
      if (current < questions.length - 1) {
        setCurrent(c => c + 1);
      } else {
        setScreen("payment");
      }
      setAnimating(false);
    }, 200);
  }

  function prev() {
    if (current > 0) {
      setAnimating(true);
      setTimeout(() => {
        setCurrent(c => c - 1);
        setAnimating(false);
      }, 200);
    }
  }

  async function submitAnswers() {
    setScreen("loading");
    try {
      const prompt = buildPrompt(answers);
      // Ruft die Vercel Funktion auf – API Key bleibt versteckt
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      if (!data.result) throw new Error("Kein Ergebnis");
      const parsed = JSON.parse(data.result);
      setResult(parsed);
      setScreen("result");
    } catch (err) {
      setError("Etwas ist schiefgelaufen. Bitte versuche es nochmal.");
      setScreen("quiz");
    }
  }

  if (screen === "intro") return <IntroScreen onStart={() => setScreen("quiz")} />;
  if (screen === "payment") return <PaymentGate digistoreLink={DIGISTORE_LINK} onPaid={() => submitAnswers()} />;
  if (screen === "loading") return <LoadingScreen />;
  if (screen === "result") return <ResultScreen result={result} onRestart={() => { setScreen("intro"); setCurrent(0); setAnswers({}); setResult(null); }} />;

  const currentBlock = blocks.find(b => b.num === q.blockNum);
  const blockProgress = blocks.findIndex(b => b.num === q.blockNum);

  return (
    <div style={styles.app}>
      <div style={styles.bg} />
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div style={styles.logo}>DEIN BUSINESS KOMPASS</div>
          <div style={styles.questionCount}>{current + 1} / {questions.length}</div>
        </div>

        {/* Progress */}
        <div style={styles.progressOuter}>
          <div style={{ ...styles.progressInner, width: `${progress}%` }} />
        </div>

        {/* Block indicators */}
        <div style={styles.blocks}>
          {blocks.map((b, i) => (
            <div key={b.num} style={{
              ...styles.blockDot,
              background: b.num < q.blockNum ? "#c4622d" : b.num === q.blockNum ? "#c4622d" : "rgba(44,31,20,0.12)",
              opacity: b.num === q.blockNum ? 1 : b.num < q.blockNum ? 0.7 : 0.3
            }} title={b.name} />
          ))}
        </div>
        <div style={styles.blockLabel}>{currentBlock?.name}</div>

        {/* Question card */}
        <div style={{
          ...styles.card,
          opacity: animating ? 0 : 1,
          transform: animating ? "translateY(8px)" : "translateY(0)",
          transition: "opacity 0.2s, transform 0.2s"
        }} ref={cardRef}>
          <div style={styles.questionText}>{q.question}</div>

          {q.type === "single" && (
            <div style={styles.options}>
              {q.options.map(opt => (
                <button key={opt} onClick={() => handleSingle(opt)} style={{
                  ...styles.optionBtn,
                  background: answers[q.id] === opt ? "#c4622d" : "#f2e8d9",
                  color: answers[q.id] === opt ? "#f2e8d9" : "#2c1f14",
                  borderColor: answers[q.id] === opt ? "#c4622d" : "#e8d9c4",
                  fontWeight: answers[q.id] === opt ? 600 : 400
                }}>{opt}</button>
              ))}
            </div>
          )}

          {q.type === "multi" && (
            <div style={styles.options}>
              <div style={styles.multiHint}>Mehrfachauswahl möglich</div>
              {q.options.map(opt => {
                const sel = (answers[q.id] || []).includes(opt);
                return (
                  <button key={opt} onClick={() => handleMulti(opt)} style={{
                    ...styles.optionBtn,
                    background: sel ? "#c4622d" : "#f2e8d9",
                    color: sel ? "#f2e8d9" : "#2c1f14",
                    borderColor: sel ? "#c4622d" : "#e8d9c4",
                    fontWeight: sel ? 600 : 400
                  }}>{opt}</button>
                );
              })}
            </div>
          )}

          {q.type === "text" && (
            <textarea
              value={answers[q.id] || ""}
              onChange={e => handleText(e.target.value)}
              placeholder={q.placeholder}
              style={styles.textarea}
              rows={4}
            />
          )}

          {error && <div style={styles.error}>{error}</div>}
        </div>

        {/* Navigation */}
        <div style={styles.nav}>
          {current > 0 && (
            <button onClick={prev} style={styles.backBtn}>← Zurück</button>
          )}
          <button
            onClick={next}
            disabled={!canProceed()}
            style={{
              ...styles.nextBtn,
              opacity: canProceed() ? 1 : 0.4,
              cursor: canProceed() ? "pointer" : "not-allowed"
            }}
          >
            {current === questions.length - 1 ? "Ideen generieren →" : "Weiter →"}
          </button>
        </div>
      </div>
    </div>
  );
}


function PaymentGate({ digistoreLink, onPaid }) {
  return (
    <div style={styles.app}>
      <div style={styles.bg} />
      <div style={{ ...styles.container, justifyContent: "center", alignItems: "center", textAlign: "center", minHeight: "100vh" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>✦</div>
        <h2 style={{ ...styles.introTitle, fontSize: 26, marginBottom: 12 }}>
          Deine Antworten sind bereit.
        </h2>
        <p style={{ ...styles.introSub, fontSize: 16, marginBottom: 8 }}>
          Die KI hat alles was sie braucht um deine<br />5 persönlichen Business-Ideen zu erstellen.
        </p>
        <p style={{ color: "#4a3323", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
          Nach dem Kauf klicke auf "Ideen jetzt generieren"<br />und deine Ergebnisse erscheinen sofort.
        </p>

        <a
          href={digistoreLink}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            background: C.terra, color: "#0d1117",
            padding: "16px 40px", borderRadius: 10,
            fontSize: 15, fontWeight: 700,
            textDecoration: "none", letterSpacing: "0.03em",
            marginBottom: 16
          }}
        >
          Jetzt kaufen – 27 € →
        </a>

        <div style={{ marginBottom: 32 }}>
          <p style={{ color: "#7a6655", fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase" }}>
            Sicherer Kauf über Digistore24
          </p>
        </div>

        <div style={{
          width: "100%", borderTop: "1px solid rgba(255,255,255,0.08)",
          paddingTop: 24, display: "flex", flexDirection: "column", alignItems: "center", gap: 12
        }}>
          <p style={{ color: "#4a3323", fontSize: 13 }}>
            Bereits bezahlt?
          </p>
          <button
            onClick={onPaid}
            style={{
              background: "transparent",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "#2c1f14",
              padding: "12px 28px", borderRadius: 10,
              fontSize: 14, cursor: "pointer"
            }}
          >
            Ideen jetzt generieren →
          </button>
        </div>
      </div>
    </div>
  );
}

function IntroScreen({ onStart }) {
  return (
    <div style={styles.app}>
      <div style={styles.bg} />
      <div style={{ ...styles.container, justifyContent: "center", alignItems: "center", textAlign: "center" }}>
        <div style={styles.introLogo}>✦</div>
        <h1 style={styles.introTitle}>Dein Business Kompass</h1>
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: "italic", color: "#7a6655", margin: "-8px 0 0", lineHeight: 1.6 }}>Persönlichkeitsbasierte Businessfindung</p>
        <p style={styles.introSub}>Manche scheitern nicht an Motivation — sondern an Ideen, die nie wirklich zu ihnen gepasst haben. 20 Fragen. 5 Ideen. Nur aus deiner Persönlichkeit.</p>
        <div style={styles.introBadge}>Persönlichkeitsbasierte Businessfindung</div>
        <button onClick={onStart} style={styles.startBtn}>Jetzt starten →</button>
        <p style={styles.introNote}>Je ehrlicher du bist, desto mehr wirst du dich in den Ideen wiederfinden.</p>
      </div>
    </div>
  );
}

function LoadingScreen() {
  const [dots, setDots] = useState(0);
  const messages = [
    "Analysiere deine Persönlichkeit...",
    "Erkenne deine Stärken...",
    "Verbinde deine Antworten...",
    "Entwickle deine 5 Ideen...",
    "Fast fertig..."
  ];
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const d = setInterval(() => setDots(p => (p + 1) % 4), 400);
    const m = setInterval(() => setMsgIdx(p => Math.min(p + 1, messages.length - 1)), 2000);
    return () => { clearInterval(d); clearInterval(m); };
  }, []);

  return (
    <div style={{ ...styles.app, justifyContent: "center", alignItems: "center" }}>
      <div style={styles.bg} />
      <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
        <div style={styles.loadingSpinner}>✦</div>
        <p style={styles.loadingText}>{messages[msgIdx]}{".".repeat(dots)}</p>
        <p style={{ color: "#7a6655", fontSize: 13 }}>Die KI liest alle 20 Antworten</p>
      </div>
    </div>
  );
}

function ResultScreen({ result, onRestart }) {
  const [expanded, setExpanded] = useState(0);

  return (
    <div style={styles.app}>
      <div style={styles.bg} />
      <div style={{ ...styles.container, maxWidth: 680 }}>
        <div style={styles.resultHeader}>
          <div style={styles.logo}>DEIN BUSINESS KOMPASS</div>
          <div style={styles.resultBadge}>✦ Deine 5 Ideen</div>
        </div>

        {/* Profile */}
        <div style={styles.profileCard}>
          <div style={styles.profileLabel}>Dein Persönlichkeitsprofil</div>
          <p style={styles.profileText}>{result.persoenlichkeitsprofil}</p>
        </div>

        {/* Ideas */}
        <div style={styles.ideasList}>
          {result.ideen?.map((idea, i) => (
            <div key={i} style={{
              ...styles.ideaCard,
              borderColor: expanded === i ? "#c4622d" : "rgba(44,31,20,0.12)"
            }}>
              <button onClick={() => setExpanded(expanded === i ? -1 : i)} style={styles.ideaHeader}>
                <div style={styles.ideaNum}>0{idea.nummer}</div>
                <div style={styles.ideaTitle}>{idea.titel}</div>
                <div style={{ color: "#c4622d", fontSize: 18 }}>{expanded === i ? "−" : "+"}</div>
              </button>

              {expanded === i && (
                <div style={styles.ideaBody}>
                  <div style={styles.ideaSection}>
                    <div style={styles.ideaSectionLabel}>Warum genau du</div>
                    <p style={styles.ideaSectionText}>{idea.warum_du}</p>
                  </div>
                  <div style={styles.ideaSection}>
                    <div style={styles.ideaSectionLabel}>Was konkret</div>
                    <p style={styles.ideaSectionText}>{idea.was_genau}</p>
                  </div>
                  <div style={styles.ideaSection}>
                    <div style={styles.ideaSectionLabel}>Dein erster Schritt</div>
                    <p style={{ ...styles.ideaSectionText, color: "#c4622d", fontWeight: 600 }}>{idea.erster_schritt}</p>
                  </div>
                  <div style={styles.ideaRow}>
                    <div style={styles.ideaTag}>⏱ {idea.zeitrahmen}</div>
                    <div style={styles.ideaTagNote}>{idea.passt_weil}</div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Motivation */}
        <div style={styles.motivationCard}>
          <div style={styles.motivationIcon}>✦</div>
          <p style={styles.motivationText}>{result.motivation}</p>
        </div>

        <button
          onClick={() => {
            const encoded = encodeURIComponent(JSON.stringify(result));
            window.open(`pdf-template.html?data=${encoded}`, '_blank');
          }}
          style={{
            background: "#2c1f14", color: "#f2e8d9", border: "none",
            padding: "14px 32px", borderRadius: 4, fontSize: 14,
            fontWeight: 500, cursor: "pointer", alignSelf: "center",
            letterSpacing: "0.08em", textTransform: "uppercase",
            fontFamily: "'DM Sans', sans-serif", marginBottom: 8
          }}
        >
          Als PDF speichern →
        </button>
        <button onClick={onRestart} style={styles.restartBtn}>Neu starten</button>
      </div>
    </div>
  );
}

const C = {
  cream: "#f2e8d9",
  cream2: "#ede0cc",
  beige: "#e8d9c4",
  brownDeep: "#2c1f14",
  brownMid: "#4a3323",
  brownLight: "#7a5c44",
  terra: "#c4622d",
  terraLight: "#d4784a",
  text: "#1e1208",
  textMid: "#4a3323",
  textLight: "#7a6655",
  border: "rgba(44,31,20,0.12)",
};

const styles = {
  app: {
    minHeight: "100vh",
    background: C.cream,
    display: "flex",
    flexDirection: "column",
    fontFamily: "'Playfair Display', 'Georgia', serif",
    color: C.text,
    position: "relative",
    overflowX: "hidden"
  },
  bg: {
    position: "fixed", inset: 0, zIndex: 0,
    background: "radial-gradient(ellipse at 80% 10%, rgba(196,98,45,0.06) 0%, transparent 50%)",
    pointerEvents: "none"
  },
  container: {
    position: "relative", zIndex: 2,
    maxWidth: 600, width: "100%",
    margin: "0 auto", padding: "32px 24px 48px",
    display: "flex", flexDirection: "column", gap: 20
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    borderBottom: `1px solid ${C.border}`, paddingBottom: 16
  },
  logo: {
    fontSize: 13, letterSpacing: "0.15em", color: C.brownDeep,
    fontFamily: "'Playfair Display', serif", textTransform: "uppercase", fontWeight: 400
  },
  questionCount: {
    fontSize: 13, color: C.terra, fontFamily: "'DM Sans', sans-serif", fontWeight: 500
  },
  progressOuter: {
    height: 2, background: C.beige, borderRadius: 2
  },
  progressInner: {
    height: "100%", background: C.terra, borderRadius: 2, transition: "width 0.4s ease"
  },
  blocks: {
    display: "flex", gap: 6, alignItems: "center"
  },
  blockDot: {
    width: 8, height: 8, borderRadius: "50%", transition: "all 0.3s"
  },
  blockLabel: {
    fontSize: 11, letterSpacing: "0.15em", color: C.terra, textTransform: "uppercase", marginTop: -8,
    fontFamily: "'DM Sans', sans-serif"
  },
  card: {
    background: C.brownDeep,
    border: `1px solid rgba(255,255,255,0.08)`,
    borderRadius: 4, padding: "32px 28px",
    display: "flex", flexDirection: "column", gap: 20,
    boxShadow: "0 2px 24px rgba(44,31,20,0.15)"
  },
  questionText: {
    fontSize: 22, fontWeight: 400, lineHeight: 1.4, color: C.cream,
    fontFamily: "'Playfair Display', serif"
  },
  options: {
    display: "flex", flexDirection: "column", gap: 10
  },
  multiHint: {
    fontSize: 12, color: "rgba(242,232,217,0.45)", marginBottom: 4,
    fontFamily: "'DM Sans', sans-serif"
  },
  optionBtn: {
    padding: "14px 18px", borderRadius: 4,
    border: `1px solid ${C.beige}`, cursor: "pointer",
    textAlign: "left", fontSize: 15, lineHeight: 1.4,
    transition: "all 0.15s", background: C.cream,
    fontFamily: "'DM Sans', sans-serif", color: C.brownDeep,
    fontWeight: 300
  },
  textarea: {
    background: "rgba(242,232,217,0.07)",
    border: "1px solid rgba(242,232,217,0.15)",
    borderRadius: 4, padding: "14px 16px",
    color: C.cream, fontSize: 15, lineHeight: 1.6,
    resize: "vertical", outline: "none",
    fontFamily: "'Playfair Display', serif",
    width: "100%", boxSizing: "border-box"
  },
  nav: {
    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12
  },
  backBtn: {
    background: "transparent", border: `1px solid ${C.border}`,
    color: C.textLight, padding: "12px 20px", borderRadius: 4,
    cursor: "pointer", fontSize: 14, fontFamily: "'DM Sans', sans-serif"
  },
  nextBtn: {
    background: C.brownDeep, color: C.cream, border: "none",
    padding: "14px 32px", borderRadius: 4, fontSize: 14,
    fontWeight: 500, cursor: "pointer", marginLeft: "auto",
    letterSpacing: "0.08em", transition: "all 0.2s",
    textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif"
  },
  error: {
    color: "#c0392b", fontSize: 13, padding: "8px 12px",
    background: "rgba(192,57,43,0.08)", borderRadius: 4
  },

  // Intro
  introLogo: { fontSize: 40, color: C.terra, marginBottom: 8 },
  introTitle: {
    fontSize: 34, fontWeight: 400, color: C.brownDeep, margin: "0 0 12px",
    fontFamily: "'Playfair Display', serif", letterSpacing: "-0.01em"
  },
  introSub: {
    fontSize: 17, color: C.textMid, lineHeight: 1.7, margin: "0 0 24px",
    fontFamily: "'DM Sans', sans-serif", fontWeight: 300
  },
  introBadge: {
    background: "rgba(196,98,45,0.08)", border: `1px solid rgba(196,98,45,0.25)`,
    color: C.terra, padding: "6px 18px", borderRadius: 20, fontSize: 12,
    letterSpacing: "0.12em", marginBottom: 32,
    fontFamily: "'DM Sans', sans-serif", textTransform: "uppercase"
  },
  startBtn: {
    background: C.brownDeep, color: C.cream, border: "none",
    padding: "16px 48px", borderRadius: 4, fontSize: 15,
    fontWeight: 500, cursor: "pointer", marginBottom: 16,
    letterSpacing: "0.08em", textTransform: "uppercase",
    fontFamily: "'DM Sans', sans-serif",
    transition: "background 0.2s"
  },
  introNote: {
    fontSize: 13, color: C.textLight, maxWidth: 320, margin: "0 auto",
    fontFamily: "'DM Sans', sans-serif"
  },

  // Loading
  loadingSpinner: {
    fontSize: 40, color: C.terra, marginBottom: 24,
    display: "inline-block"
  },
  loadingText: { fontSize: 18, color: C.brownDeep, marginBottom: 8, fontFamily: "'Playfair Display', serif" },

  // Result
  resultHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${C.border}`, paddingBottom: 16 },
  resultBadge: { fontSize: 11, color: C.terra, letterSpacing: "0.2em", textTransform: "uppercase", fontFamily: "'DM Sans', sans-serif" },
  profileCard: {
    background: "rgba(196,98,45,0.06)", border: `1px solid rgba(196,98,45,0.2)`,
    borderRadius: 4, padding: "24px"
  },
  profileLabel: { fontSize: 11, letterSpacing: "0.2em", color: C.terra, textTransform: "uppercase", marginBottom: 10, fontFamily: "'DM Sans', sans-serif" },
  profileText: { fontSize: 16, lineHeight: 1.7, color: C.textMid, margin: 0, fontFamily: "'Playfair Display', serif", fontStyle: "italic" },
  ideasList: { display: "flex", flexDirection: "column", gap: 12 },
  ideaCard: {
    background: "white", border: `1px solid`,
    borderRadius: 4, overflow: "hidden", transition: "border-color 0.2s",
    boxShadow: "0 1px 8px rgba(44,31,20,0.05)"
  },
  ideaHeader: {
    display: "flex", alignItems: "center", gap: 16,
    padding: "20px 24px", background: "transparent",
    border: "none", color: C.brownDeep, cursor: "pointer",
    width: "100%", textAlign: "left"
  },
  ideaNum: { fontSize: 12, color: C.terra, fontFamily: "'DM Sans', sans-serif", minWidth: 24, fontWeight: 500 },
  ideaTitle: { fontSize: 17, fontWeight: 400, flex: 1, fontFamily: "'Playfair Display', serif" },
  ideaBody: { padding: "0 24px 24px", display: "flex", flexDirection: "column", gap: 16 },
  ideaSection: {},
  ideaSectionLabel: { fontSize: 11, letterSpacing: "0.15em", color: C.textLight, textTransform: "uppercase", marginBottom: 6, fontFamily: "'DM Sans', sans-serif" },
  ideaSectionText: { fontSize: 15, lineHeight: 1.7, color: C.textMid, margin: 0, fontFamily: "'DM Sans', sans-serif", fontWeight: 300 },
  ideaRow: { display: "flex", gap: 12, flexWrap: "wrap", alignItems: "flex-start" },
  ideaTag: { background: "rgba(196,98,45,0.08)", color: C.terra, padding: "4px 12px", borderRadius: 20, fontSize: 12, fontFamily: "'DM Sans', sans-serif" },
  ideaTagNote: { fontSize: 13, color: C.textLight, flex: 1, fontFamily: "'DM Sans', sans-serif" },
  motivationCard: {
    background: C.brownDeep, border: "none",
    borderRadius: 4, padding: "32px 28px", textAlign: "center"
  },
  motivationIcon: { fontSize: 22, color: C.terraLight, marginBottom: 12 },
  motivationText: { fontSize: 16, lineHeight: 1.8, color: "rgba(242,232,217,0.85)", margin: 0, fontStyle: "italic", fontFamily: "'Playfair Display', serif" },
  restartBtn: {
    background: "transparent", border: `1px solid ${C.border}`,
    color: C.textLight, padding: "12px 24px", borderRadius: 4,
    cursor: "pointer", fontSize: 13, alignSelf: "center",
    fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.08em", textTransform: "uppercase"
  }
};
