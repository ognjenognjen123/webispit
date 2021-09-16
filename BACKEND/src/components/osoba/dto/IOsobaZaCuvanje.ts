import Ajv from "ajv";
import {TipOsobe} from "../model";

interface IOsobaZaCuvanje {
    tip: TipOsobe
    ime: string
    prezime: string
    telefon: string
    email: string
    lozinka: string
}

const ajv = new Ajv();

const IAddUserValidator = ajv.compile({
    type: "object",
    properties: {
        ime: {
            type: "string",
            minLength: 1,
            maxLength: 255,
        },
        prezime: {
            type: "string",
            minLength: 1,
            maxLength: 255,
        },
        telefon: {
            type: "string",
            minLength: 1,
            maxLength: 24,
        },
        lozinka: {
            type: "string",
            minLength: 6,
            maxLength: 255,
        },
        email: {
            type: "string",
            pattern: "[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+",
        }
    },
    required: [
        "tip",
        "ime",
        "prezime",
        "telefon",
        "email",
        "lozinka",
    ],
    additionalProperties: false,
})

export { IOsobaZaCuvanje };
export { IAddUserValidator };