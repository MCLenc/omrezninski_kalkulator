# Kalkulator stroškov električne energije
#### Client: Elektro Celje

[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)

Kalkulator stroškov električne energije je aplikacija, ki uporabnikom omogoča primerjalni izračun stroškov omrežnine po:
- Metodologoiji obračuna omrežnine skladno s [Aktom o metodologiji za določitev regulativnega okvira in metodologiji za obračunavanje omrežnine za elektrooperaterje](http://www.pisrs.si/Pis.web/pregledPredpisa?id=AKT_1050) (veljaven do 30.9.2024).
- Metodologoiji obračuna omrežnine skladno s [Aktom o metodologiji za obračunavanje omrežnine za elektrooperaterje](http://pisrs.si/Pis.web/pregledPredpisa?id=AKT_1266) (veljaven od 1.10.2024 dalje).

Izračun je na voljo takšen kot je in ne upošteva vseh posebnosti zakonodaje (npr. upoštevanje vezalnih shem, proizvedene energije, vključitev v sistemske storitve, nov uporabnik omrežja itd.), omogoča le osnovne izračune za odjemalce električne energije.

## Funkcionalnosti:
- Informativni izračun stroškov omrežnine po metodologiji obračuna omrežnine (eno ali dvo tarifni sistem).
- Informativni izračun stroškov omrežnine po metodologiji obračuna omrežnine (časovni bloki in sezone) ob različnih kombinacijah dogovorjenih moči in porabe energije v posameznih časovnih blokih.
- `Opcijsko:` Informativni izračun stroškov omrežnine presežnih moči. 
- `Opcijsko:` Informativni izračun stroškov porabljene energije/energenta (eno ali dvo tarifni sistem).
- Enostavne razlage nove terminologije vezane na obračun omrežnine po časovnih blokih z uporabo info gumbov.
- Validacija vnosov neveljavnih kombinacij:
    - parametrov odjemnih skupin
    - vrednosti dogovorjenih moči
- Upoštevan cenik stroškov omrežnine za leto 2024, ki je na voljo na spletni strani: [link](https://www.uradni-list.si/glasilo-uradni-list-rs/vsebina/2023-01-3431/akt-o-dolocitvi-tarifnih-postavk-za-omreznine-elektrooperaterjev).

## Omejitve:
- Aplikacija ne podpira uvoza časovnih serij t.j. dejanskih 15-minutnih meritev porabljene energije ali 15-minutnih meritev profila moči.
- Informativni izračun stroškov omrežnine presežnih moči podpira le presežke v vrednosti 1 kW. Za presežke večjih vrednosti je potrebno navesti večkratnik (npr. če ste 5-krat presegli vašo dogovorjeno moč za 1kW ali pa ste 1-krat presegli vašo dogovorjeno moč za 5 kW v polje za št. presežkov vpišite 5).

## Licenca
MIT

##### Dodatna pojasnila
*Aplikacija je informativne narave. Uporaba aplikacije in njenih rezultatov je na lastno odgovornost. Odgovornost avtorjev in naročnika aplikacije za morebitno škodo, stroške ali neprijetnosti, ki bi lahko nastale zaradi uporabe aplikacije je v celoti izključena.*