
import {login, signup, logout} from '../controllers/auth'
import express from 'express';

export default (router:express.Router) => {

    router.post('/login', login);
    router.post('/signup', signup);
    router.post('/logout', logout);

}

