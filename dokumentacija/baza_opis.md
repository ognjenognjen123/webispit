Baza se sastoji od cetiri tabele:
- osoba
- anketa
- predlog
- redovna_obavestavanja

Tabela osoba se koristi za cuvanje podataka korisnika, trenera i nutricionista.
Posto cuvamo razlicite tipove osoba u tabeli, uvodimo polje tip kako bi ih
razlikovali. Iz zahteva zadatka korisnik treba da ima od podataka ime,
prezime, email, telefon i lozinku. Kako nije receno drugacije, iste podatke
cuvamo za tip osobe trener i nutricionista. Kada se registruje novi korisnik
u nasoj aplikaciji, pravi se nova osoba tipa korisnik i cuva se u tabeli.
Pravljenje novih trenera i nutricionista putem aplikacije nije podrzano.
Sva polja su tekstualna izuzev tipa koji je enum.

Tabela anketa je namenjana za cuvanje korisnickih anketa i dohvatanje istih
za potrebe gledanja od strane trenera i nutricionista. Tabela sadrzi polja
pol, uzrast, visina, telesna_masa, obim_struka, kcal, opis_dnevnih_navika,
opis_zeljenih_rezultata. Polja visinam telesna_masa, obim_struka, kcal su
brojevi, dok su ostala tekst. Tabela ima samo strani kljuc koji se koristi
kao primarni, jer anketa nema smisla da postoji bez korisnika i svaki
korisnik moze imati samo jednu anketu koju popunjava jednom nakon prve
prijave na aplikaciju.

Tabela redovna_obavestenja...