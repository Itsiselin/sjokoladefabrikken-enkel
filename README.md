# Sjokoladefabrikken – enkel versjon

## Åpne prosjektet

1. Pakk ut ZIP-filen.
2. Åpne mappen `sjokoladefabrikken-enkel` i VS Code.
3. Åpne `index.html` i nettleseren, eller høyreklikk den og velg **Open with Live Server** hvis utvidelsen er installert.

Bare HTML, CSS og JavaScript. Ingen PHP, npm eller database.

## Kundens flyt

Port og startknapp → velg sjokolade → velg maks tre toppinger → navn og gave → ferdig illustrasjon → last ned eller del.

Smaksprofessoren ligger i en valgfri, sammenleggbar boks. Fire faste forslag basert på smaksretning; ingen KI. Tidligere testordreoversikt, lagring i nettleseren og ekstra informasjonsseksjoner er fjernet. Resultatet eksisterer bare mens siden er åpen. Last ned bildet for å beholde det.

Instagram/Facebook bruker Web Share for bildefiler når nettleseren støtter det. Mobil, sikker kontekst og installerte apper avgjør hva som vises. Ingen automatisk publisering. På PC lastes bildet ned og legges ut manuelt. PNG er 1080 × 1080.

## Endre kode

- `index.html`: tekster, valg og struktur.
- `css/style.css`: port, farger og mobilvisning. Nyeste stilregler ligger nederst.
- `js/app.js`: sjokolade, topping, priser og forhåndsvisning.
- `js/factory.js`: port, steg, smaksforslag, ferdig bilde og deling.

## Grunnlag og avgrensning

Referanse: https://marsipanfabrikken.no/produkt/sjokoladefabrikken/
Den nåværende produktsiden selger en fysisk opplevelse i Posebyen. Dette prosjektet er en digital konfiguratorprototype basert på brukerens ønske og intervjunotatet. Lenken «Besøk oss i Posebyen» går til den eksisterende produktsiden.

Palett fra bedriftens nettside: #ede2d3, #ecc784, #8b2f2f, #5c3629, #3e2723 og #fff8e1. Sortiment og pris er fortsatt eksempler: 189 kr i grunnpris fra intervjunotatet, 10/15 kr topping og 25 kr gave. Dette er ikke den nåværende prisen for fysisk besøk.

Ingen reelle kjøp, betaling eller levering. Allergener og tilgjengelig sortiment må avklares før produksjonsbruk. Illustrasjonen er tegnet i CSS og canvas.

## Sjekk før presentasjon

Startknappen viser konfiguratoren. Stegene har tilbake/neste. Tre toppinger sperrer det fjerde valget. Melk + bringebær + karamell + gave gir 239 kr. Navn kreves før ferdig plate. Smaksprofessorens forslag kan endres. Last ned PNG, og test deling på mobil. «Lag en ny sjokolade» starter på første steg igjen.
