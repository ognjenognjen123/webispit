import IConfig from "../common/IConfig.interface";

const CFG: IConfig = {
    cors: {
        origin: ['http://localhost:3000', 'http://localhost:3001']
    },
    server: {
        port: 3001,
        static: {
            path: "./static/",
            route: "/static",
            cacheControl: true,
            dotfiles: "deny",
            maxAge: 3600000,
            etag: false,
            index: false,
        }
    },
    database: {
        host: "localhost",
        port: 3307,
        user: "root",
        password: "toor",
        database: "web_ispit_baza",
        charset: "utf8",
        timezone: "+01:00",
    },
}

export default CFG;