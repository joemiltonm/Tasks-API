
import mongoose from 'mongoose';
import { Schema } from 'zod';


// Schema creation

const userSchema = new mongoose.Schema({
    name: {required: true, type:String},
    email: {required: true, type: String},
    authentication : {
        password: {required:true, type:String, select:false},
        salt : {required:true, type:String, select:false},
        sessionToken : {type:String, select:false}
    }
})

const taskSchema = new mongoose.Schema({
    task : {
        title : {required:true, type:String},
        description : {required:true, type:String}
    },
    assignedTo : {required:false, type:String},
    deadline : {type:String},
    completionStatus :{type:String},
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref : 'users'
    }
})

// -------------------------------------------

// model creation
const user = mongoose.model("users", userSchema)
const task = mongoose.model("tasks", taskSchema)
// -------------------------------------------



export const createUser = (credentials:Record<string, any>) => {
    new user(credentials).save();
}

export const findUserByEmail = (email:string) => user.findOne({email})

export const findUserByToken = (token:String) => user.findOne({'authentication.sessionToken' : token})

export const newTask = (taskDetails:Record<string,any>) => {
    new task(taskDetails).save()
}

export const findTasks = (searchDetails:Record<string,any>) => task.find(searchDetails)


