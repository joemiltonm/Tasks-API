
import express, { NextFunction } from 'express';
import { findUserByToken } from '../db/index';


export const isAuthenticated = async (req:express.Request, res:express.Response, next:NextFunction) => {

    const token = req.cookies['auth'];

    if(!token){
        return res.send("login to add tasks")
    }

    const user = await findUserByToken(token);
    req.body.createdBy = user._id
    
    if(!user){
        return res.sendStatus(403)
    }
    else{
        next()        
    }
}