export enum TipOsobe {
    korisnik, trener, nutricionista
}

export interface Osoba {
    id: number

    tip: TipOsobe
    ime: string
    prezime: string
    email: string
    lozinka: string
}

export interface Anketa {
    korisnicki_id: number

    pol: string
    uzrast: string
    visina: number
    telesna_masa: number
    obim_struka: number
    kcal: number
    opis_dnevnih_navika: string
    opis_zeljenih_rezultata: string
}

export interface Predlog {
    korisnicki_id: number
    specialista_id: number

    predlog: string
}

export interface RedovnaObavestavanja {
    id: number
    korisnicki_id: number

    telesna_masa: number
    obim_struka: number
    kcal: number
}