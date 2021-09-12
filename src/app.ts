import {Anketa, Osoba, Predlog, RedovnaObavestavanja, TipOsobe} from "./model";
import {db} from "./baza";
import {OkPacket, RowDataPacket} from "mysql2";

const sveOsobe = (callback: Function) => {

    const upitBaze = 'SELECT * FROM OSOBA';

    db.query(
        upitBaze,
        [],
        (err, result) => {
            if (err) {
                callback(err)
            }

            //
            const rows = <RowDataPacket[]> result;
            const osobe: Osoba[] = [];

            rows.forEach(row => {
                const osoba: Osoba =  {
                    id: row.id,
                    tip: row.tip,
                    ime: row.ime,
                    prezime: row.prezime,
                    email: row.email,
                    lozinka: row.lozinka,
                }
                osobe.push(osoba);
            });
            //

            callback(null, osobe);
        }
    );
}

sveOsobe(console.log)