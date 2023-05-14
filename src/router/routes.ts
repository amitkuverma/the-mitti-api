import express, { Request, Response } from "express";
import multer from "multer";

import { userController } from '../controllers';

export class Routes {
    public routes( app:express.Application ):void {
        const upload = multer({ dest: 'src/uploads'})
        app.route('/').get((req: Request, res: Response) => {
            res.status(200).send({
                message: 'GET request successfully !!!'
            })
        })

        app.route('/users').get(userController.getUsers)
        app.route('/auth/register').post(userController.createUser)
    }
    
}