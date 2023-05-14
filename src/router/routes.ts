import express, { NextFunction, Request, Response } from "express";
import multer from "multer";
import httpStatusCode from "http-status-codes";

import { userController } from '../controllers';

export class Routes {
    public routes( app:express.Application ):void {
        const upload = multer({ dest: 'src/uploads'})
        app.route('/').get((req: Request, res: Response) => {
            res.status(httpStatusCode.OK).send({
                message: 'GET request successfully !!!'
            })
        })

        app.route('/users').get(userController.getUsers)
        app.route('/auth/register').post(userController.createUser)
        app.route('/login').post(userController.loginUser)
    }
    
}