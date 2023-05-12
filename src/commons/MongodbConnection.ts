import mongoose from "mongoose";

export class MongodbConnection {
    public DbConnect(){
        try {
            const mongoURI = "mongodb+srv://the-mitti:the-mitti@cluster0.4qnusao.mongodb.net/?retryWrites=true&w=majority";
            mongoose.connect(mongoURI, {
                autoIndex: true
            }).then(()=>{
                console.log("Database connection successfully!!!")
            }).catch((error)=>{
                throw new Error(error)
            })
        } catch (error) {
            throw new Error(error);
        }
    }
}