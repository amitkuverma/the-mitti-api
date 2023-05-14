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
    password: {
        type: String,
        require: true, 
        select: false
    },
    isAdmin:  {
        type: Boolean,
        default: false
    },
    inserted_date: {
        type: Date,
        default: Date.now
    }
});

export const UserModel = mongoose.model('User', UserSchema);
