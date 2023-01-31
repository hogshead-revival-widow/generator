AHKs per No-Code-Editor für die DIGAS-Erfassungsmaske generieren. In dist/ liegt die gebündete Fassung, die Datei ist komplett lokal nutzbar.

# Entwicklung

1.  `npm i`
2.  `npm run dev`

Alle Anpassungen vorgenommen? Dann: `npm run build`.

# Übersicht

-   `lib/`: Komponenten, die nicht zu einem der folgenden Verzeichnisse gehören
    -   `lib/ahk/`: Generierung des AHKs
    -   `lib/config/`: Einstellungen (z. B. ansteuerbare DIGAS-Felder, Erklärtexte, Schrittabfolge)
    -   `lib/steps/`: die wesentlichen Schritte, wie sie der Nutzerin präsentiert werden
    -   `lib/stores/`: die genutzten stores, wobei `input` der wichtigste ist (speichert Nutzerinnen-Eingabe)
