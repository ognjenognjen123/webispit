import express from "express";
import * as bodyParser from "body-parser";
import {ruter} from "./rute";
import cors from "cors";

const app = express();


// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001'];

const options: cors.CorsOptions = {
    origin: allowedOrigins
};
app.use(cors(options));
//--

app.use(bodyParser.json());
app.use("/", ruter);

app.listen(3001, () => {
    console.log("Node server started running on port 3001");
});