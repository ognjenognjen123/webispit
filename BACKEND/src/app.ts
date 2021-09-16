import express from "express";
import cors from "cors";
import CFG from "./config/dev";
import IApplicationResources from "./common/IApplicationResources.interface";
import Router from "./router";
import mysql from 'mysql2/promise';
import UserService from "./components/osoba/service";
import UserRouter from "./components/osoba/router";

async function main() {
    const app: express.Application = express();

    app.use(cors(CFG.cors));

    app.use(express.json());

    const resources: IApplicationResources = {
        conn: await mysql.createConnection({
            host: CFG.database.host,
            port: CFG.database.port,
            user: CFG.database.user,
            password: CFG.database.password,
            database: CFG.database.database,
            charset: CFG.database.charset,
            timezone: CFG.database.timezone,
            supportBigNumbers: true,
        }),
    }

    resources.services = {
        userService: new UserService(resources),
    }

    await resources.conn.connect();

    app.use(
        CFG.server.static.route,
        express.static(CFG.server.static.path, {
            index: CFG.server.static.index,
            cacheControl: CFG.server.static.cacheControl,
            maxAge: CFG.server.static.maxAge,
            etag: CFG.server.static.etag,
            dotfiles: CFG.server.static.dotfiles,
        }));

    Router.setupRoutes(app, resources, [
        new UserRouter(),
    ]);

    app.use((req, res) => {
        res.sendStatus(404);
    });

    // app.use((err, req, res, next) => {
    //     res.status(err.status).send(err.type);
    // });

    app.listen(CFG.server.port, () => {
        console.log("Node server started running on port " + CFG.server.port);
    });
}

main()