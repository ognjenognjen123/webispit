import BaseService from "../../common/BaseService";
import IAdaptModelOptions from "../../common/IAdaptModelOptions.interface";
import IErrorResponse from "../../common/IErrorResponse.interface";
import {IOsobaZaCuvanje} from "./dto/IOsobaZaCuvanje";
import UserModel from "./model";

class UserModelAdapterOptions implements IAdaptModelOptions {
}

class UserService extends BaseService<UserModel> {
    protected async adaptModel(data: any, options: Partial<IAdaptModelOptions>): Promise<UserModel> {
        const osoba: UserModel = new UserModel();

        osoba.id = data.id;
        osoba.tip = data.tip;
        osoba.ime = data.ime;
        osoba.prezime = data.prezime;
        osoba.email = data.email;
        osoba.telefon = data.telefon;
        osoba.lozinka = data.lozinka;

        return osoba;
    }

    public async getAll(): Promise<UserModel[] | null | IErrorResponse> {
        return await this.getAllFromTable("osoba", {});
    }

    public async getById(userId: number): Promise<UserModel | null | IErrorResponse> {
        return await this.getByIdFromTable("osoba", userId, {});
    }

    //za potrebe registracije korisnika
    public async addUser(osoba: IOsobaZaCuvanje): Promise<UserModel | null | IErrorResponse> {
        return new Promise<UserModel | IErrorResponse>(resolve => {
            const upitBaze = 'INSERT INTO OSOBA (tip, ime, prezime, email, telefon, lozinka) VALUES (?, ?, ?, ?, ?, ?)';

            this.db.execute(
                upitBaze,
                [
                    osoba.tip,
                    osoba.ime,
                    osoba.prezime,
                    osoba.email,
                    osoba.telefon,
                    osoba.lozinka
                ])
                .then(async result => {
                    const newUserId: number = +((result[0] as any)?.insertId);
                    // @ts-ignore
                    resolve(await this.getById(newUserId));
                })
                .catch(error => {
                    resolve({
                        errorCode: error?.errno,
                        errorMessage: error?.sqlMessage
                    });
                })
        })
    }
}

export default UserService