
import express from 'express';
import { createUser, findUserByEmail, findUserByToken } from '../db/index';
import {random, hash} from '../helpers/index'


/*

while loggin in, the user will give the email, password. 
need to verify and then generate a session token and save it in the db. 

*/ 
export async function login(req : express.Request, res:express.Response){
    const {email, password} = req.body;

    const user = await findUserByEmail(email).select('+authentication.salt +authentication.password')

    if(!user){
        return res.sendStatus(403)
    }

    const expected_hash = hash(password, user.authentication.salt)

    if (expected_hash === user.authentication.password){
        const token = random()
        user.authentication.sessionToken = token
        res.cookie("auth", token)
        
        await user.save()   

        return res.send("logged in successfully")
    }
    else{
        res.send("wrong password")
    }
    
}


// when the user hits logout, the token has to be removed from the database and cookie. 


export const logout = async(req : express.Request, res:express.Response) => {
    const token = req.cookies['auth']
    const user = await findUserByToken(token)

    if(user){
        user.authentication.sessionToken = null
        user.save()
    }
    res.cookie("auth", null)
    return res.send("logged out successfully")
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



