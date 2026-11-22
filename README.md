# biigewis

Eine kleine Sammlung von Visualisierungen zu Politik und Gesellschaft in Appenzell Innerrhoden.

**Online:** https://ursulinakoelbener.github.io/biigewis/

## Worum es geht

biigewis ist ein Freizeitprojekt aus persönlichem Interesse an Politik und Gesellschaft Innerrhodens. Es verbindet Wissen und Fähigkeiten aus dem Studium in [Computational Social Sciences (LUMACSS)](https://www.unilu.ch/studium/studienangebot/master/kultur-und-sozialwissenschaftliche-fakultaet/lucerne-master-in-computational-social-sciences-lumacss/) der Universität Luzern mit dem Blick auf Innerrhoder Gegebenheiten, soziale Strukturen, Institutionen und gesellschaftlichen Wandel. Der interdisziplinäre Studiengang verbindet Geistes- und Sozialwissenschaften mit Statistik und Computational Sciences.

Ziel ist es, mit Open Government Data (OGD) zu arbeiten und Daten mit interaktiven Visualisierungen auf spannende Weise erlebbar zu machen. Datensätze werden aber auch selber zusammengetragen, aufbereitet und hier als CSV zur Verfügung gestellt.

## Der Name

«biigewis» ist ein Innerrhoder Dialektwort und bedeutet «stapelweise» (Manser, Joe: Innerrhoder Dialekt. Mundartwörter und Redewendungen aus Appenzell Innerrhoden, Appenzell 2001, 5. Aufl. 2013, S. 37). Es steht für die vielen Daten, die im Rahmen dieses Projekts verarbeitet werden sollen.

## Visualisierungen

| Seite | Inhalt |
|---|---|
| Standeskommission | Übersicht über alle Mitglieder seit 1984 |
| Standeskommission im Zeitverlauf | Einzelne Jahre mit Regler durchblättern, Anteil Frauen und Männer |
| Amtszeiten der Standeskommission | Amtszeiten und Funktionen der Mitglieder seit 1873 |
| Grosser Rat | Alle Mitglieder, nach Bezirk, Geschlecht, Zugehörigkeit oder Amtsjahren dargestellt |

Eine Übersicht nach Themen gibt es auf `themen.html`.

## Daten und Quellen

Die Daten liegen als CSV (Trennzeichen `;`) in `docs/data/`. Die Quellen sind auf der jeweiligen Seite angegeben.

## Technik

Statische Seite ohne Build-Schritt: HTML, CSS und JavaScript mit [D3](https://d3js.org) und [Tufte CSS](https://edwardtufte.github.io/tufte-css/). Veröffentlicht über GitHub Pages aus dem Ordner `docs/`.

```
docs/
  *.html               eine Seite pro Visualisierung (themen.html = Übersicht)
  data/                CSV-Dateien und pages.json (Liste aller Seiten)
  components/          Kopf- und Fusszeile
  pages.js, pages.css  Brotkrumen, Themenübersicht, "Weitere Visualisierungen"
  custom.css           eigenes Styling
```

## Neue Visualisierung hinzufügen

1. Seite in `docs/` anlegen (am besten eine bestehende kopieren) und die CSV in `docs/data/` ablegen.
2. Einen Eintrag in `docs/data/pages.json` ergänzen (`titel`, `thema`, `seite`, `beschreibung`, `aktualisiert`).
3. In die neue Seite die Platzhalter für Brotkrumen und "Weitere Visualisierungen" sowie `pages.js` einbinden (siehe Kopf von `docs/pages.js`).
4. Auf der Seite Datenquelle und Stand angeben.

Menü, Themenübersicht und Verweise zwischen den Seiten entstehen automatisch aus `pages.json`. Einmal veröffentlichte Dateinamen nicht mehr ändern, sonst funktionieren bestehende Links nicht mehr.

## Lokal ansehen

Die Seiten laden ihre Daten per `fetch` und funktionieren daher nicht per Doppelklick. Im Projektordner:

```
python3 -m http.server 8000 --directory docs
```

Danach http://localhost:8000 im Browser öffnen. Beenden mit `Strg + C`.

## Lizenz und Kontakt

- **Daten und Texte:** [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.de). Weiterverwendung mit Quellenangabe erlaubt.
- **Code:** [MIT](https://opensource.org/license/mit).
- Die Datensätze beruhen auf Quellen Dritter (siehe Angaben auf den Seiten). Deren Rechte bleiben unberührt.
- Kontakt: hoi@koelbener.ch
