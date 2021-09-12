import {
    Anketa,
    Osoba,
    OsobaZaCuvanje,
    OsobaZaPrijavu,
    Predlog,
    RedovnoObavestavanje,
    RedovnoObavestavanjeZaCuvanje
} from "./model";
import mysql, {OkPacket, RowDataPacket} from 'mysql2';

export const db = mysql.createConnection({
    host: 'localhost',
    port: 3307,
    user: 'root',
    password: 'toor',
    database: 'web_ispit_baza'
});

//za potrebe pregleda svih korisnika od strane trenera i nutricioniste
export function dohvatiSveOsobe(callback: Function) {

    const upitBaze = 'SELECT * FROM OSOBA';

    db.query(
        upitBaze,
        [],
        (err, result) => {
            if (err) {
                callback(err)
            }

            //
            const rows = <RowDataPacket[]>result;
            const osobe: Osoba[] = [];

            rows.forEach(row => {
                const osoba: Osoba = {
                    id: row.id,
                    tip: row.tip,
                    ime: row.ime,
                    prezime: row.prezime,
                    email: row.email,
                    telefon: row.telefon,
                    lozinka: row.lozinka,
                }
                osobe.push(osoba);
            });
            //

            callback(null, osobe);
        }
    );
}

//za potrebe registracije korisnika
export function sacuvajOsobu(osoba: OsobaZaCuvanje, callback: Function) {

    const upitBaze = 'INSERT INTO OSOBA (tip, ime, prezime, email, telefon, lozinka) VALUES (?, ?, ?, ?, ?, ?)';

    db.query(
        upitBaze,
        [osoba.tip, osoba.ime, osoba.prezime, osoba.email, osoba.telefon, osoba.lozinka],
        (err, result) => {
            if (err) {
                callback(err)
            }

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}

//za potrebe prijave osobe
export function nadjiOsobuPoEmailuILozinci(osoba: OsobaZaPrijavu, callback: Function) {

    const upitBaze = "SELECT * FROM osoba WHERE email=? AND lozinka=?";

    db.query(
        upitBaze,
        [osoba.email, osoba.lozinka],
        (err, result) => {
            if (err) {
                callback(err)
            }

            const rows = <RowDataPacket[]>result;

            if (rows.length == 0) {
                callback(null, null)
            } else {
                const row = rows[0];
                const osoba: Osoba = {
                    id: row.id,
                    tip: row.tip,
                    ime: row.ime,
                    prezime: row.prezime,
                    email: row.email,
                    telefon: row.telefon,
                    lozinka: row.lozinka,
                }
                callback(null, osoba);
            }
        }
    );
}

//za potrebe cuvanja ankete korisnika
export function sacuvajAnketu(anketa: Anketa, callback: Function) {

    const upitBaze = 'INSERT INTO ANKETA (korisnicki_id, pol, uzrast, visina, telesna_masa, obim_struka, kcal, opis_dnevnih_navika, opis_zeljenih_rezultata) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';

    db.query(
        upitBaze,
        [anketa.korisnicki_id, anketa.pol, anketa.uzrast, anketa.visina, anketa.telesna_masa, anketa.obim_struka, anketa.kcal, anketa.opis_dnevnih_navika, anketa.opis_zeljenih_rezultata],
        (err, result) => {
            if (err) {
                callback(err)
            }

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}

//za potrebe dohvatanja ankete da bi trener ili nutricionista videli
export function dohvatiAnketuZaKorisnickiId(korisnickiId: number, callback: Function) {

    const upitBaze = 'SELECT * FROM anketa WHERE korisnicki_id = ?';

    db.query(
        upitBaze,
        [korisnickiId],
        (err, result) => {
            if (err) {
                callback(err)
            }

            const rows = <RowDataPacket[]>result;
            const row = rows[0];
            const anketa: Anketa = {
                korisnicki_id: row.korisnicki_id,
                pol: row.pol,
                uzrast: row.uzrast,
                visina: row.visina,
                telesna_masa: row.telesna_masa,
                obim_struka: row.obim_struka,
                kcal: row.kcal,
                opis_dnevnih_navika: row.opis_dnevnih_navika,
                opis_zeljenih_rezultata: row.opis_zeljenih_rezultata,
            }
            callback(null, anketa);
        }
    );
}

//za potrebe cuvanja i menjanja predloga za korisnika od strane trenera ili nutricioniste
export function sacuvajIliIzmeniPredlog(predlog: Predlog, callback: Function) {

    const upitBaze = 'REPLACE INTO predlog (korisnicki_id, specialista_id, predlog) VALUES (?, ?, ?)';

    db.query(
        upitBaze,
        [predlog.korisnicki_id, predlog.specialista_id, predlog.predlog],
        (err, result) => {
            if (err) {
                callback(err)
            }

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}

//za potrebe dohvatanja predloga za korisnika
export function dohvatiPredlogeZaKorisnika(korisnickiId: number, callback: Function) {

    const upitBaze = 'SELECT * FROM predlog WHERE korisnicki_id = ?';

    db.query(
        upitBaze,
        [korisnickiId],
        (err, result) => {
            if (err) {
                callback(err)
            }

            //
            const rows = <RowDataPacket[]>result;
            const predlozi: Predlog[] = [];

            rows.forEach(row => {
                const predlog: Predlog = {
                    korisnicki_id: row.korisnicki_id,
                    specialista_id: row.specialista_id,
                    predlog: row.predlog,
                }
                predlozi.push(predlog);
            });
            //

            callback(null, predlozi);
        }
    );
}

//za potrebe cuvanja redovnih obavestenja korisnika
export function sacuvajRedovnoObavestenje(obavestenje: RedovnoObavestavanjeZaCuvanje, callback: Function) {

    const upitBaze = 'INSERT INTO REDOVNA_OBAVESTAVANJA (korisnicki_id, telesna_masa, obim_struka, kcal) VALUES (?, ?, ?, ?)';

    db.query(
        upitBaze,
        [obavestenje.korisnicki_id, obavestenje.telesna_masa, obavestenje.obim_struka, obavestenje.kcal],
        (err, result) => {
            if (err) {
                callback(err)
            }

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
}

//za potrebe dohvatanja redovnih obavestenja korisnika da bi trener ili nutricionista videli
export function dohvatiRedovnaObavestenjaZaKorisnika(korisnickiId: number, callback: Function) {

    const upitBaze = 'SELECT * FROM redovna_obavestavanja WHERE korisnicki_id = ?';

    db.query(
        upitBaze,
        [korisnickiId],
        (err, result) => {
            if (err) {
                callback(err)
            }

            //
            const rows = <RowDataPacket[]>result;
            const obavestenja: RedovnoObavestavanje[] = [];

            rows.forEach(row => {
                const obavestenje: RedovnoObavestavanje = {
                    id: row.id,
                    korisnicki_id: row.korisnicki_id,
                    telesna_masa: row.telesna_masa,
                    obim_struka: row.obim_struka,
                    kcal: row.kcal,
                }
                obavestenja.push(obavestenje);
            });
            //

            callback(null, obavestenja);
        }
    );
}
