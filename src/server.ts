import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import * as connection from "./commons/MongodbConnection";
import router from "./router"
import rout from './app'

const port = process.env.PORT || 4000
const app = express();

app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());


const server = http.createServer(app);

server.listen(port, () => {
    new connection.MongodbConnection().DbConnect();
    console.log("server is running on port http://localhost:" + port)
})

app.use(rout);
app.use('/', router())