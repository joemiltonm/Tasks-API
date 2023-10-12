
import mongoose from 'mongoose';


const userSchema = new mongoose.Schema({
    name: {required: true, type:String},
    email: {required: true, type: String},
    authentication : {
        password: {required:true, type:String, select:false},
        salt : {required:true, type:String, select:false},
        sessionToken : {type:String, select:false}
    }
})



const user = mongoose.model("users", userSchema)

export const createUser = (credentials:Record<string, any>) => {
    new user(credentials).save();
    console.log(credentials)
}

export const findUserByEmail = (email:string) => user.findOne({email})

export const findUserByToken = (token:String) => user.findOne({'authentication.sessionToken' : token})


