import { Request, Response } from "express";
import { UserModel } from "../models/user.model";

export class UserController {

    constructor() { }


    async getUsers(req: Request, res: Response) {
        const result = await UserModel.find();
        res.status(200).json(result)
    }

    async getUserByEmail(req: Request, res: Response) {
        if (!req.body.email) {
            res.status(400).json({ code: "Email not recived" })
        }
        const result = UserModel.findOne({ email: req.body.email })
        res.status(200).json(result)
    }

    async getUserById(req: Request, res: Response) {
        if (!req.params.id) {
            res.status(400).json({ code: "Id not recived" })
        }
        const result = await UserModel.findOne({ _id: req.params.id });
        res.status(200).json(result)
    }
    
    async createUser(req: Request, res: Response) {
        console.log(req.body)
        const result = await new UserModel(req.body).save().then(user => user.toObject())
        res.status(200).json(result)
    }

    async deleteUserById(req: Request, res: Response) {
        const result = await UserModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result)
    }

    async updateById(req: Request, res: Response) {
        UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
    }

} 
