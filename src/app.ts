import {TipOsobe} from "./model";
import {sacuvajOsobu} from "./baza";


sacuvajOsobu({
    tip: TipOsobe.korisnik,
    ime: 'aaa',
    prezime: 'bbb',
    telefon: '222',
    email: 'email',
    lozinka: 'test'
},console.log)