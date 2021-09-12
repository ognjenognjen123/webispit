import express, {Request, Response} from "express";
import {Anketa, Osoba, OsobaZaCuvanje, OsobaZaPrijavu, Predlog, RedovnoObavestavanje} from "./model";
import {
    dohvatiAnketuZaKorisnickiId,
    dohvatiPredlogeZaKorisnika,
    dohvatiRedovnaObavestenjaZaKorisnika,
    dohvatiSveKorisnike,
    nadjiOsobuPoEmailuILozinci,
    sacuvajAnketu,
    sacuvajIliIzmeniPredlog,
    sacuvajOsobu,
    sacuvajRedovnoObavestenje
} from "./baza";

export const ruter = express.Router();

ruter.get("/dohvati-korisnike", async (req: Request, res: Response) => {
    dohvatiSveKorisnike((err: Error, osobe: Osoba[]) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json(osobe);
    })
});


ruter.post("/registracija-korisnika", async (req: Request, res: Response) => {
    const novaOsoba: OsobaZaCuvanje = req.body;
    sacuvajOsobu(novaOsoba, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"id": id});
    });
});


ruter.post("/prijavi-osobu", async (req: Request, res: Response) => {
    const osobaZaPrijavu: OsobaZaPrijavu = req.body;
    nadjiOsobuPoEmailuILozinci(osobaZaPrijavu, (err: Error, osoba: Osoba) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }

        if (osoba == null) {
            return res.status(400).json({"message": 'Pogresan email ili lozinka'});
        }

        res.status(200).json(osoba);
    });
});


ruter.post("/sacuvaj-anketu", async (req: Request, res: Response) => {
    const novaAnketa: Anketa = req.body;
    sacuvajAnketu(novaAnketa, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"id": id});
    });
});


ruter.get("/dohvati-anketu-za-korisnika/:id", async (req: Request, res: Response) => {
    const korisnickiId: number = Number(req.params.id);
    dohvatiAnketuZaKorisnickiId(korisnickiId, (err: Error, anketa: Anketa) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json(anketa);
    })
});


ruter.post("/sacuvaj-predlog", async (req: Request, res: Response) => {
    const novIliIzmenjenPredlog: Predlog = req.body;
    sacuvajIliIzmeniPredlog(novIliIzmenjenPredlog, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"id": id});
    });
});


ruter.get("/dohvati-predloge-za-korisnika/:id", async (req: Request, res: Response) => {
    const korisnickiId: number = Number(req.params.id);
    dohvatiPredlogeZaKorisnika(korisnickiId, (err: Error, predlozi: Predlog[]) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json(predlozi);
    })
});


ruter.post("/sacuvaj-redovno-obavestenje", async (req: Request, res: Response) => {
    const novoObavestenje: RedovnoObavestavanje = req.body;
    sacuvajRedovnoObavestenje(novoObavestenje, (err: Error, id: number) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json({"id": id});
    });
});


ruter.get("/dohvati-redovna-obavestenja-za-korisnika/:id", async (req: Request, res: Response) => {
    const korisnickiId: number = Number(req.params.id);
    dohvatiRedovnaObavestenjaZaKorisnika(korisnickiId, (err: Error, obavestenja: RedovnoObavestavanje[]) => {
        if (err) {
            return res.status(500).json({"message": err.message});
        }
        res.status(200).json(obavestenja);
    })
});

