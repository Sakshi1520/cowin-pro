require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
mongoose.set('useFindAndModify', false);
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the database - Vaccinedb'))

// app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}))

const userRouter = require('./routes/userLogin')
app.use('/user',userRouter)

const vaccinatorRouter = require('./routes/vaccinatorLogin')
app.use('/vaccinator',vaccinatorRouter)

const sessionRouter = require('./routes/sessionAdd')
app.use('/session',sessionRouter)

const appRouter = require('./routes/appointments')
app.use('/appointment',appRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log('Server started!'))

