import * as dotenv from 'dotenv'
import express, { Application } from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import favicon from 'serve-favicon'
import { connectDB } from './database/db'
import { json } from 'body-parser'
import { router } from './routes/router'
import { errorHandler } from './middleware/error'
import { notFoundHandler } from './middleware/notFound'
dotenv.config()

const app: Application = express()

// Middleware
app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(router)
app.use(favicon(__dirname + '/public/favicon.ico'))
app.use(express.static(__dirname + '/public'))
app.use(errorHandler)
app.use(notFoundHandler)

if (!process.env.PORT) {
  process.exit(1)
}

// call and connect to DB
connectDB()

// Server Listening
app.listen(process.env.PORT || 5000, () => {
  console.log(`server start running at port ${process.env.PORT}!`)
  console.log(`Server is Live here -> http://localhost:${process.env.PORT}`)
})
