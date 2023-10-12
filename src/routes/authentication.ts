
import {login, signup, logout} from '../controllers/auth'
import { signupValidation } from '../middlewares/signupValidation';
import express from 'express';

export default (router:express.Router) => {

    router.post('/login', login);
    router.post('/signup',signupValidation, signup);
    router.post('/logout', logout);

}

