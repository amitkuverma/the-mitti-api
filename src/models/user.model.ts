import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    authentication:{
        password: {
            type: String,
            require: true, 
            select: false
        },
        salt:  {
            type: String, 
            select: false
        },
        sessionToken: {
            type: String,
            select: false
        },
    },    
    inserted_date: {
        type: Date,
        default: Date.now
    },
    updated_date: {
        type: Date,
        default: Date.now
    },
    updated_by: {
        type: String,
        default: ''
    }
});

export const UserModel = mongoose.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({email});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({sessionToken});
export const getUserById = (id: string) => UserModel.findOne({id});
export const createUser = (value: Record<string, any>) => new UserModel(value).save().then(user => user.toObject());
export const deleteUserById = (id:string)=> UserModel.findOneAndDelete({_id: id});
export const updateById = (id:string, values: Record<string, any>)=> UserModel.findByIdAndUpdate(id, values)