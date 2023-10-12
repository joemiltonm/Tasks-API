
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express()

app.use(cors())
app.use(compression())
app.use(cookieParser())
app.use(bodyParser.json())

mongoose.connect('mongodb+srv://mjoemilton:WAnpmpJqUhVD1E0h@cluster0.schtnpz.mongodb.net/tasks')

mongoose.connection.on('error', () => {
    console.log("error occured in Mongo db")
})



app.listen(3000, () => {
    console.log("server started")
})


