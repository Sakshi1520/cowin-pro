require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const cors = require('cors');
app.use(express.urlencoded({extended: false}));
app.use(cors({origin: "*"}));

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

const mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true,  useUnifiedTopology: true })
const db = mongoose.connection
mongoose.set('useFindAndModify', false);
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to the database - Vaccinedb'))

// app.use(express.json())
app.use(bodyParser.json({extended: true}))

const userRouter = require('./routes/userLogin')
app.use('/user',userRouter)

const vaccinatorRouter = require('./routes/vaccinatorLogin')
app.use('/vaccinator',vaccinatorRouter)

const sessionRouter = require('./routes/sessionAdd')
app.use('/session',sessionRouter)

const appRouter = require('./routes/appointments')
app.use('/appointment',appRouter)

const waitListRouter = require('./routes/waitList')
app.use('/waitList',waitListRouter)

const port = process.env.PORT || 3001


app.listen(port, () => console.log('Server started!'))

