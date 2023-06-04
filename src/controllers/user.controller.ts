import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { random } from "../healpers/jwtAuthentication"

export class UserController {

    constructor() { }


    async getUsers(req: Request, res: Response) {
        const result = await UserModel.find();
        res.status(200).json(result)
    }

    async loginUser(req: Request, res: Response) {
        if (!req.body.email && !req.body.password) {
            res.status(400).json({ code: "Email not recived" })
        }
        const user = await UserModel.findOne({ email: req.body.email })
        bcrypt.compare(req.body.password, user.password, (err, passCompare) => {
            if (passCompare === true) {
                const payload = {
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    isAdmin: user.isAdmin,
                    inserted_date: user.inserted_date
                }
                var token = jwt.sign(payload, random(),{ expiresIn: 60 * 60 });
                const response = {
                    message: "Login successfull !!!",
                    token: 'Barrer ' + token,
                    status: 200,
                }
                res.status(200).json(response)
            } else {
                res.status(500).json({message: "Password not correct"})
            }
        })
    }

    async getUserByEmail(req: Request, res: Response) {
        if (!req.body.email) {
            res.status(400).json({ code: "Email not recived" })
        }
        const result = await UserModel.findOne({ email: req.body.email })
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
        const user = await UserModel.findOne({ email: req.body.email })
        if (user) {
            res.send({ message: 'Email already exists' })
        } else {
            const salt = await bcrypt.genSalt(10)
            const hashPassword: string = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashPassword
            const result = await new UserModel(req.body).save().then(user => user.toObject())

            res.status(200).json(result)
        }
    }

    async deleteUserById(req: Request, res: Response) {
        const result = await UserModel.findOneAndDelete({ _id: req.params.id });
        res.status(200).json(result)
    }

    async updateById(req: Request, res: Response) {
        UserModel.findByIdAndUpdate({ _id: req.params.id }, req.body)
    }

} 
