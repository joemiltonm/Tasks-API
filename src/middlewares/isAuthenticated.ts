
import express, { NextFunction } from 'express';
import { findUserByToken } from '../db/index';


export const isAuthenticated = (req:express.Request, res:express.Response, next:NextFunction) => {

    const token = req.cookies['auth'];

    const user = findUserByToken(token);
    req.body.user = user
    
    if(!user){
        res.sendStatus(403)
    }
    else{
        req.body.user = user
        next()        
    }
}