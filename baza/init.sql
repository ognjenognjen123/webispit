DROP DATABASE IF EXISTS web_ispit_baza;
CREATE DATABASE web_ispit_baza;
USE web_ispit_baza;

CREATE OR REPLACE TABLE OSOBA (
  id INTEGER auto_increment primary key,

  tip ENUM ('korisnik', 'trener', 'nutricionista'),
  ime TINYTEXT,
  prezime TINYTEXT,
  email TINYTEXT unique,
  lozinka TINYTEXT
);

INSERT INTO OSOBA (tip, ime, prezime, email, lozinka) values
('korisnik', 'djosa', 'dodjos', 'djosa@teretana.com', 'test'),
('trener', 'misa', 'misic', 'misko@teretana.com', 'test'),
('nutricionista', 'nutri', 'bulet', 'nutri@teretana.com', 'test');

CREATE OR REPLACE TABLE  ANKETA (
  korisnicki_id INTEGER primary key,

  pol ENUM('muski', 'zenski', 'drugo'),
  uzrast TINYTEXT,
  visina FLOAT,
  telesna_masa FLOAT,
  obim_struka FLOAT,
  kcal INTEGER,
  opis_dnevnih_navika TEXT,
  opis_zeljenih_rezultata TEXT,

  foreign key (korisnicki_id)
      references OSOBA(id)
      on delete cascade
);

INSERT INTO ANKETA (korisnicki_id, pol, uzrast, visina, telesna_masa, obim_struka, kcal, opis_dnevnih_navika, opis_zeljenih_rezultata) VALUES (
 (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
 'muski', 'dete', 167, 55.2, 80, 1800, 'najpre cokolada onda krompir i u krug', 'vise cokolade, manje krompira'
 );

# DELETE FROM OSOBA WHERE id = 1; # demo kaskade

CREATE OR REPLACE TABLE PREDLOG (
  korisnicki_id INTEGER,
  specialista_id INTEGER,

  predlog TEXT,

  primary key (korisnicki_id, specialista_id),

  foreign key (korisnicki_id)
      references OSOBA(id)
      on delete cascade,

  foreign key (specialista_id)
      references OSOBA(id)
      on delete cascade
);

INSERT INTO PREDLOG (korisnicki_id, specialista_id, predlog) VALUES (
    (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
    (SELECT id FROM OSOBA WHERE tip = 'trener' LIMIT 1),
    'zgib svaki dan dok ne budes odmoran'
),(
    (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
    (SELECT id FROM OSOBA WHERE tip = 'nutricionista' LIMIT 1),
    'jabuke plase doktore'
);

UPDATE PREDLOG SET predlog = 'samo zgibovi i propadanja!'
WHERE korisnicki_id = (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1) AND
      specialista_id = (SELECT id FROM OSOBA WHERE tip = 'trener' LIMIT 1);

CREATE OR REPLACE TABLE  REDOVNA_OBAVESTAVANJA (
  id INTEGER auto_increment primary key,
  korisnicki_id INTEGER,

  telesna_masa FLOAT,
  obim_struka FLOAT,
  kcal INTEGER,

  foreign key (korisnicki_id)
      references OSOBA(id)
      on delete cascade
);

INSERT INTO REDOVNA_OBAVESTAVANJA (korisnicki_id, telesna_masa, obim_struka, kcal) VALUES (
    (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
    56, 82, NULL
),(
    (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
    58, 85, 1400
),(
    (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
    56, 81, NULL
),(
    (SELECT id FROM OSOBA WHERE tip = 'korisnik' LIMIT 1),
    57, 88, 1600
);


SELECT * FROM OSOBA
WHERE tip = 'korisnik';

SELECT * FROM ANKETA
WHERE korisnicki_id = 1;

SELECT * FROM REDOVNA_OBAVESTAVANJA
WHERE korisnicki_id = 1;

