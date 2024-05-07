import express from 'express'
import morgan from 'morgan'
import userRoutes from './routes/users.routes.js'


const app = express()

app.use(morgan('tiny'))
app.use(express.json())
app.use(userRoutes)

app.listen(4000)
