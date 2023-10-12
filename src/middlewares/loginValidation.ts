import express, { NextFunction } from 'express';
import { z } from 'zod';

const loginCredentials = z.object({
    email:z.string().email(),
    password: z.string().min(8)
})


export const loginValidation = async (req:express.Request, res:express.Response, next:NextFunction) => {
    try{
        loginCredentials.parse(req.body)
        next()
    }
    catch(error){
        res.send("validation failed, enter proper email/password")
    }
}

