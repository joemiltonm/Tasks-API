
import {login, signup, logout} from '../controllers/auth'
import { signupValidation } from '../middlewares/signupValidation';
import { loginValidation } from '../middlewares/loginValidation';
import express from 'express';

export default (router:express.Router) => {

    router.post('/login',loginValidation, login);
    router.post('/signup',signupValidation, signup);
    router.post('/logout', logout);
}



