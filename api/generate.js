// api/generate.js
// Vercel Serverless Function – versteckt den Gemini API Key

export default async function handler(req, res) {
  // CORS erlauben
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Kein Prompt übergeben" });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.85,
            maxOutputTokens: 2048,
          },
        }),
      }
    );

    const data = await response.json();

    // Gemini Antwort extrahieren
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    const clean = text.replace(/```json|```/g, "").trim();

    return res.status(200).json({ result: clean });
  } catch (err) {
    console.error("Gemini API Fehler:", err);
    return res.status(500).json({ error: "API Fehler. Bitte nochmal versuchen." });
  }
}
