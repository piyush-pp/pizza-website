require('dotenv').config()
const express = require('express')
const app = express()
const ejs = require('ejs')
const expressLayout = require('express-ejs-layouts')
const path = require('path')
const PORT = process.env.PORT || 3000
const mongoose = require('mongoose')
const session = require('express-session')
const flash  =require('express-flash')
const MongoDbStore = require('connect-mongo')(session)


//database connectivity
const url='mongodb://localhost/pizza';
mongoose.connect(url,{useNewUrlParser: true,useUnifiedTopology: true}) 
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('Database connected');
}).catch(err=>{
    console.log('connection failed...')
})


//session store
let mongoStore= new MongoDbStore({
                    mongooseConnection: connection,
                    collection:'sessions'
                })

//session config
app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie:{ maxAge:1000*60*60*24}//24 hours
}))

app.use(flash())
//Assets
app.use(express.static('public'))
app.use(express.json())

//global middleware
app.use((re,res,next)=>{
    res.locals.session = re.session
    next()
})

//set template engine
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resources/views'))
app.set('view engine', 'ejs')

require('./routes/web')(app)

app.listen(PORT, (re, res) => {
    console.log('server started')
})