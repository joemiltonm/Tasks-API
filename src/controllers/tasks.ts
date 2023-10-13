
import express from 'express';
import { newTask, findTasks } from '../db/index'


export const createTask = (req:express.Request, res:express.Response) => {
    const task = req.body

    newTask(task)
    return res.sendStatus(200) 
    
}

export const searchTask = async (req:express.Request, res:express.Response) => {

    const {completionStatus, createdBy } = req.body

    const tasks = await findTasks({
        completionStatus,
        createdBy
    })

    return res.json(tasks)

}

