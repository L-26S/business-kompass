# Business Kompass – Setup Guide

## Deine Dateien
```
/
├── landing-page-v2.html        → Die Landing Page
├── business-idea-generator.jsx → Der Fragebogen + KI Analyse
├── pdf-template.html           → Das PDF Template
├── vercel.json                 → Vercel Konfiguration
└── api/
    └── generate.js             → Vercel Funktion (versteckt den API Key)
```

---

## SCHRITT 1 – Gemini API Key holen (5 Minuten)

1. Gehe auf https://aistudio.google.com
2. Oben rechts auf "Get API Key" klicken
3. "Create API Key" klicken
4. Den Key kopieren und sicher aufbewahren (sieht so aus: AIzaSy...)

---

## SCHRITT 2 – GitHub Repo anlegen (5 Minuten)

1. Gehe auf https://github.com und erstelle ein neues Repository
2. Name z.B. "business-kompass"
3. Alle Dateien hochladen (drag & drop funktioniert)
4. Struktur muss exakt so aussehen wie oben gezeigt

---

## SCHRITT 3 – Vercel einrichten (10 Minuten)

1. Gehe auf https://vercel.com und logge dich mit GitHub ein
2. "Add New Project" klicken
3. Dein GitHub Repo auswählen
4. Vor dem Deploy: unter "Environment Variables" folgendes eintragen:
   - Name: GEMINI_API_KEY
   - Value: dein API Key von Schritt 1
5. Deploy klicken
6. Vercel gibt dir eine URL wie: https://business-kompass.vercel.app
   → Das ist die URL für den Generator

---

## SCHRITT 4 – Digistore24 einrichten (15 Minuten)

1. Logge dich in Digistore24 ein
2. Neues Produkt anlegen:
   - Name: Business Kompass
   - Preis: 27,00 Euro
   - Produkttyp: Digitales Produkt
3. Unter "Dankeseite" deine Vercel URL eintragen:
   https://business-kompass.vercel.app/business-idea-generator
4. Deinen Digistore24 Zahlungslink kopieren

---

## SCHRITT 5 – Links eintragen (5 Minuten)

In der Datei **landing-page-v2.html** an zwei Stellen:
```
href="DEIN_DIGISTORE_LINK"
```
ersetzen durch deinen echten Digistore24 Link.

In der Datei **business-idea-generator.jsx** an einer Stelle:
```
const DIGISTORE_LINK = "DEIN_DIGISTORE_LINK";
```
ersetzen durch deinen echten Digistore24 Link.

---

## SCHRITT 6 – Landing Page hosten (5 Minuten)

Option A – Auch auf Vercel (einfachste Lösung):
Die landing-page-v2.html ist bereits im Repo, Vercel hostet sie automatisch.
URL wäre dann: https://business-kompass.vercel.app/landing-page-v2

Option B – GitHub Pages:
1. Im GitHub Repo auf "Settings" gehen
2. "Pages" auswählen
3. Branch "main" auswählen
4. URL wird: https://DEINNAME.github.io/business-kompass/landing-page-v2.html

---

## SCHRITT 7 – Alles testen (30 Minuten)

1. Landing Page aufrufen und prüfen ob alles gut aussieht
2. Auf "Jetzt starten" klicken
3. Alle 20 Fragen beantworten (ehrlich – das ist auch dein erster echter Test)
4. Auf dem Payment Gate: "Bereits bezahlt?" klicken um direkt zum Ergebnis zu kommen
5. Prüfen ob die 5 Ideen wirklich persönlich klingen
6. "Als PDF speichern" klicken und PDF prüfen
7. Auf dem Handy testen

---

## SCHRITT 8 – Instagram (30 Minuten)

1. Neuen Instagram Account erstellen: @logicsoul.de oder ähnlich
2. Einen Post mit anonymisiertem Ergebnis-Screenshot
3. Hook: "Ich habe 20 Fragen beantwortet und zum ersten Mal hatte ich das Gefühl, das bin ich."
4. Link in Bio auf die Landing Page

---

## Bei Problemen

**Generator zeigt Fehler nach dem Kauf:**
→ Prüfe ob der GEMINI_API_KEY in Vercel korrekt eingetragen ist

**PDF wird nicht befüllt:**
→ Generator und pdf-template.html müssen auf derselben Domain liegen

**Digistore Link funktioniert nicht:**
→ Prüfe ob das Produkt in Digistore24 auf "aktiv" gesetzt ist
