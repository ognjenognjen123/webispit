Da bi pokrenuli aplikaciju potrebno je da imate instalirano:

- NodeJs 14
- MariaDb ili Mysql server sa sledecim parametrima:
  - host: 'localhost'
  - port: 3307,
  - user: 'root'
  - password: 'toor'

Pre pokretanja aplikacije potrebno je inicjalizujete bazu pokretanjem init.sql ili dump.sql skripte
iz foldera dodatni_resursi\baza

Da bi pokrenuli BACKEND aplikaciju:
1. otidite u folder BACKEND
2. pokrenite naredbu: npm start

BACKEND aplikacija bice pokrenuta na portu 3001

Da bi pokrenuli FRONTEND aplikaciju:
1. otidite u folder FRONTEND
2. pokrenite naredbu: npm start

FRONTEND aplikacija bice pokrenuta na portu 3000

--
Dostupni korisnici za potrebe testiranja:

Korisnik:
- email: djosa@teretana.com
- lozinka: test

Trener:
- email: misko@teretana.com
- lozinka: test

Nutricionista:
- email: nutri@teratana.com
- lozinka: test