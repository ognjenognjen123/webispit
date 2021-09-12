export enum TipOsobe {
    korisnik = 'korisnik',
    trener = 'trener',
    nutricionista = 'nutricionista'
}

export interface OsobaZaPrijavu {
    email: string
    lozinka: string
}

export interface OsobaZaCuvanje extends OsobaZaPrijavu{
    tip: TipOsobe
    ime: string
    prezime: string
    telefon: string
}

export interface Osoba extends OsobaZaCuvanje{
    id: number
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

export interface RedovnoObavestavanjeZaCuvanje {
    korisnicki_id: number

    telesna_masa: number
    obim_struka: number
    kcal: number
}

export interface RedovnoObavestavanje extends RedovnoObavestavanjeZaCuvanje{
    id: number
}