import { NextFunction } from 'connect';
import express from 'express';
import z from 'zod';

const userData = z.object({
    name : z.string(),
    email: z.string().email(),
    password : z.string().min(8)
})



export const signupValidation = async (req:express.Request, res:express.Response, next:NextFunction) => {

    try{
        userData.parse(req.body)
        next()
    }
    catch(error){
        res.send("failed validation")
    }

}

