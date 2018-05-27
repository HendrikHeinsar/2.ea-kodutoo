# 2. kodutöö – kirjutamise mängu täiendamine

Mängu eesmärk on võimalikult kiiresti ekraanile tekkivaid sõnu ära trükkida. Sõnad on võetud [Eesti Keele Instituudi lehelt](http://www.eki.ee/tarkvara/wordlist/) – [lemmad2013](http://www.eki.ee/tarkvara/wordlist/lemmad2013.txt). Aluseks tuleb võtta kood **[eesrakenduste-arendamine-2018k/klahvimine](https://github.com/eesrakenduste-arendamine-2018k/klahvimine)**. 

Aluseks on võetud failid: http://web.zone.ee/hehe/3_tund/
## LOOJAD:
Hendrik Heinsar ja Krister Riska

SKEEM
![Programmi flowchart](schema.png)
## Mängutöö lühikirjeldus:
Lehe laadimisel tööle minev script kontrollib, mis kell on ning vastavalt otsustab mis värvi tuleb leheküljel taust. (See on meie lahendus nö. "nightmode'le")
Algsel lehel on lühikirjeldus mängust ning mängijal võimalik valida mängu raskusaste. Mida raskem raskusaste seda kiiremini sõnad jooksevad ekraanil. Mäng kestab 30 sekundit, siis teavitatakse mängijat tulemusest ning näidatakse algset "menüüd" jälle. Lehel on ka all navbar, mille abil saab ennast navigeerida mängu tulemustabelisse, kus on näha 10 parimat mängijat (parimate saavutustega). Tingimusel, et mängijaid on vähem kui 10, näidatakse mängijale vastav arv parimaid tulemusi.
Skoori moodustamine:
scoreMath = scoreMath + 70 + Math.round(Math.random()*30) + (guessed*30);
Skoori hoitakse muutuja "scoreMath" sees. 
Mäng võtab lõppskooriks suurima saavutatud skoori ühe mängu jooksul ehk kui mängija suurim saavutatud skoor mängu jooksul on 1000 aga lõpetades 950 siis localStorage-sse läheb skoor 1000, mitte 950!
Skoori arvutatakse ühe suvalise numbri (0-30ni) ja õigesti arvatud sõnade abil.
