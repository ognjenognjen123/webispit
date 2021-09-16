import IModel from "../../common/IModel.interface";

export enum TipOsobe {
    korisnik = 'korisnik',
    trener = 'trener',
    nutricionista = 'nutricionista'
}

export default class UserModel implements IModel {
    id!: number;
    tip!: TipOsobe;
    ime!: string
    prezime!: string
    telefon!: string
    email!: string
    lozinka!: string
}
