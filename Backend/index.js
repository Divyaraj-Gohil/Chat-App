import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import connectDB from './config/db.js'
import user from './routes/user.route.js'
import message from './routes/message.route.js'
import errorMiddleware from './middlewares/error.middleware.js'
import { app, server } from './socket/socket.js'

dotenv.config()
//const app = express()
const crossOption = {
    origin: ['https://divyaraj-gohil.github.io', 'https://divyaraj-gohil-chat.netlify.app', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}

app.use(morgan('dev'))
app.use(cors(crossOption))
app.use(express.json())
app.use(cookieParser())
app.use(errorMiddleware)

connectDB()

app.use('/api/v1/user', user)
app.use('/api/v1/message', message)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log(`server running on ${PORT}`)
})