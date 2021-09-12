> Korisnici se registruju unosom imena, prezimena, jedinstvene adrese elektronske pošte, jedinstvenog broja telefona i željene lozinke za nalog.
```
POST
/registracija-korisnika
{
    ime
    prezime
    email
    telefon
    lozinka
}
```

>Kada se prijave,
```
POST
/prijavi-osobu
{
    email
    lozinka
}
```

> imaju mogućnost za popune anketu za prikupljanje podataka o njihovoj visini, telesnoj masi, obimu struka, polu, uzrastu, količini dnevnog unosa hrane (u kcal), kao i o svojim dnevnim navikama (učestalost kretanja, vežbanja, sedenja za stolom ili računarom, stajanja itd), kao i opisa željenih rezultata planiranog treninga i plana ishrane.
```
POST
/sacuvaj-anketu
{
    korisnicki_id
    pol
    uzrast
    visina
    telesna_masa
    obim_struka
    kcal
    opis_dnevnih_navika
    opis_zeljenih_rezultata
}
```

> Ove prikupljene podatke iz ankete gledaju
```
GET
/dohvati-anketu-za-korisnika/{korisnicki_id}
{
    korisnicki_id
    pol
    uzrast
    visina
    telesna_masa
    obim_struka
    kcal
    opis_dnevnih_navika
    opis_zeljenih_rezultata
}
```

>jedan trener i jedan nutricionista koji prema sadržaju ankete prave mesečni plan treninga i plan ishrane, respektivno. Svoje planove sastavljaju u direktnom usmenom dogovoru koji se odvija izvan okvira aplikacije.
```
nista
```

>Trener i nutricionista se na aplikaciju prijavljuju sa svojim pristupnim parametrima. Ove dve grupe korisnika se razlikuju samo po svojoj oznaci uloge (trener ili nutricionista) i nisu posebni entiteti u bazi aplikacije.
```
postojeca ruta /prijavi-osobu
```

>Kada i trener i nutricionista popune predložene planove treninga i ishrane za korisnika,
```
POST
/sacuvaj-predlog
{
    korisnicki_id
    specialista_id
    predlog
}
```

> korisnik tek tada na svom profilu može da vidi te planove.
```
GET
/dohvati-predloge-za-korisnika/{korisnicki_id}
[
    {
    korisnicki_id
    specialista_id
    predlog
    }
]
```

>Korisnik treba u okviru svog profila redovno da unosi, na dnevnom nivou, na početku dana podatke o izmerenoj telesnoj masi i obimu struka, kao i na kraju dana podatke o izmerenoj telesnoj masi, obimu struka, i o unetoj količini hrane tog dana (okvirno sračunatu u kcal).
```
POST
/sacuvaj-redovno-obavestenje
{
    korisnicki_id
    telesna_masa
    obim_struka
    kcal
}
```

> Na osnovu ovih podataka, trener ili nutricionista povremeno mogu da pregledaju dostupne informacije
```
GET
/dohvati-redovna-obavestenja-za-korisnika/{korisnicki_id}
[
    {
        korisnicki_id
        telesna_masa
        obim_struka
        kcal
    }
]
```

> i mogu da unesu izmenu u tekstu svojih planova treninga i ishrane, a čemu korisnik dobija obaveštenje elektronskom poštom.
```
podrzacemo opet preko postojece rute /sacuvaj-predlog
```