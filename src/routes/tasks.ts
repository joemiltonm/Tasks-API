
import express from 'express';
import {createTask, searchTask} from '../controllers/tasks'
import {isAuthenticated} from '../middlewares/isAuthenticated'

export const tasks = (router:express.Router) => {
    router.post('/createTasks',isAuthenticated, createTask)
    router.post('/searchTasks',isAuthenticated, searchTask)
}


