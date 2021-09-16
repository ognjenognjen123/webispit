drop database if exists web_ispit_baza;
create database web_ispit_baza;
use web_ispit_baza;

create or replace table osoba (
  osoba_id integer auto_increment primary key,

  tip enum ('korisnik', 'trener', 'nutricionista'),
  ime tinytext,
  prezime tinytext,
  email tinytext unique,
  telefon tinytext unique,
  lozinka tinytext
);

insert into osoba (tip, ime, prezime, email, telefon, lozinka) values
('korisnik', 'djosa', 'dodjos', 'djosa@teretana.com', '061', 'test'),
('trener', 'misa', 'misic', 'misko@teretana.com', '062', 'test'),
('nutricionista', 'nutri', 'bulet', 'nutri@teretana.com', '063', 'test');

create or replace table  anketa (
  fk_osoba_id integer primary key,

  pol enum('muski', 'zenski', 'drugo'),
  uzrast tinytext,
  visina float,
  telesna_masa float,
  obim_struka float,
  kcal integer,
  opis_dnevnih_navika text,
  opis_zeljenih_rezultata text,

  foreign key (fk_osoba_id)
      references osoba(osoba_id)
      on delete cascade
);

insert into anketa (fk_osoba_id, pol, uzrast, visina, telesna_masa, obim_struka, kcal, opis_dnevnih_navika, opis_zeljenih_rezultata) values (
 (select osoba_id from osoba where tip = 'korisnik' limit 1),
 'muski', 'dete', 167, 55.2, 80, 1800, 'najpre cokolada onda krompir i u krug', 'vise cokolade, manje krompira'
 );

# delete from osoba where id = 1; # demo kaskade

create or replace table predlog (
  fk_osoba_korisnik_id integer,
  fk_osoba_specialista_id integer,

  predlog text,

  primary key (fk_osoba_korisnik_id, fk_osoba_specialista_id),

  foreign key (fk_osoba_korisnik_id)
      references osoba(osoba_id)
      on delete cascade,

  foreign key (fk_osoba_specialista_id)
      references osoba(osoba_id)
      on delete cascade
);

insert into predlog (fk_osoba_korisnik_id, fk_osoba_specialista_id, predlog) values (
    (select osoba_id from osoba where tip = 'korisnik' limit 1),
    (select osoba_id from osoba where tip = 'trener' limit 1),
    'zgib svaki dan dok ne budes odmoran'
),(
    (select osoba_id from osoba where tip = 'korisnik' limit 1),
    (select osoba_id from osoba where tip = 'nutricionista' limit 1),
    'jabuke plase doktore'
);

update predlog set predlog = 'samo zgibovi i propadanja!'
where fk_osoba_korisnik_id = (select osoba_id from osoba where tip = 'korisnik' limit 1) and
      fk_osoba_specialista_id = (select osoba_id from osoba where tip = 'trener' limit 1);

create or replace table  redovno_obavestavanje (
  redovno_obavestavanje_id integer auto_increment primary key,
  fk_osoba_id integer,

  telesna_masa float,
  obim_struka float,
  kcal integer,

  foreign key (fk_osoba_id)
      references osoba(osoba_id)
      on delete cascade
);

insert into redovno_obavestavanje (fk_osoba_id, telesna_masa, obim_struka, kcal) values (
    (select osoba_id from osoba where tip = 'korisnik' limit 1),
    56, 82, null
),(
    (select osoba_id from osoba where tip = 'korisnik' limit 1),
    58, 85, 1400
),(
    (select osoba_id from osoba where tip = 'korisnik' limit 1),
    56, 81, null
),(
    (select osoba_id from osoba where tip = 'korisnik' limit 1),
    57, 88, 1600
);


select * from osoba
where tip = 'korisnik';

select * from anketa
where fk_osoba_id = 1;

select * from redovno_obavestavanje
where fk_osoba_id = 1;

