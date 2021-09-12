import express from "express";
import * as bodyParser from "body-parser";
import {ruter} from "./rute";


const app = express();

app.use(bodyParser.json());
app.use("/", ruter);

app.listen(3000, () => {
    console.log("Node server started running on port 3000");
});