import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import { Routes } from "./router/routes"
import { error } from "console";

class App {
    public app: express.Application;
    public routePrv: Routes = new Routes()
    constructor() {
        this.app = express();
        this.config();

        if (true) {
            this.app.use(cors());
        } else {
            const whitelist = ['https://the-mitti.onrender.com/'];
            const corsOptions = {
                origin: function (origin: any, callback: any) {
                    if (whitelist.indexOf(origin) !== -1) {
                        callback(null, true)
                    } else {
                        callback(new Error('Not allowed by CORS'))
                    }
                },
                methods: "GET,HEAD,PUT,PATCH,POST",
                optionsSuccessStatus: 200
            }
            this.app.use(cors());
        }
        this.routePrv.routes(this.app)

        // process.on('unhandledRejection', (error: Error) => {
        //     commonErrorHandler.errorHandler.handleError(error);
        // });

        // process.on('uncaughtException', (error: Error) => {
        //     commonErrorHandler.errorHandler.handleError(error);
        // });

        // this.initializeErrorHandling()

    }

    private config(): void {
        this.app.use(bodyParser.json({limit: '900'}));
        this.app.use(bodyParser.urlencoded({limit: '900', extended: true, parameterLimit: 50000 }));
        this.app.use(cookieParser());
    }

    // private initializeErrorHandling() {
    //     this.app.use((err, req, res, next)=>{
    //         err.statusCode = err.statusCode || 500;
    //         err.status = err.status || 'error';
    //         res.status(err.statusCode).json({
    //             status: err.status,
    //             message: err.message
    //         })
    //     })
    // }
}
export default new App().app;
