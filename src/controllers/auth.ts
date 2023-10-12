
import express from 'express';
import { createUser, findUserByEmail } from '../db/index';
import {random, hash} from '../helpers/index'


export function login(req : express.Request, res:express.Response){
    
    
}

export function logout(req : express.Request, res:express.Response){
    
}

/* while signing up, the use would give the following details 
name,
email,
password

*/

export async function signup (req : express.Request, res:express.Response){
    const {name, email, password} = req.body;

    if (!name || !email || !password){
        return res.sendStatus(400)
    }

    const existingUser = await findUserByEmail(email)

    if (existingUser){
        return res.send("email already exists")
    }

    const salt = random()
    const hashed_pass = hash(password,salt)
        

    const userDetails = {
        name, 
        email, 
        authentication : {
            password : hashed_pass,
            salt
        }
    }

    createUser(userDetails)
    return res.sendStatus(200)  
}



