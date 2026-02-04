import express from 'express'
import "dotenv/config"
import cors from 'cors'
import helmet from 'helmet'
import authRouter from './routes/auth.route.js'
import categoriesRouter from './routes/category.route.js'
import annoncesRouter from './routes/annonce.route.js'




const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

app.use('/auth', authRouter)
app.use('/categories', categoriesRouter)
app.use('/annonces', annoncesRouter)





export default app; 